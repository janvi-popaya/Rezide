import Listings from "../models/listing.model.js";
import Media from "../models/media.model.js";
import { ListingStatus, OnboardingStep } from "../constants/index.constant.js";
import { ApiError } from "../utils/apiError.js";
import { validateListingSubmission } from "../validations/submit.validation.js";

type AuthContext = {
    sub: string;
    firm_id: string;
};
class ListingService {
    // private flatten(data: Record<string, any>, prefix = ""): Record<string, any> {
    //     const result: Record<string, any> = {};
    //     for (const [key, value] of Object.entries(data)) {
    //         if (value === undefined) continue;
    //         const path = prefix ? `${prefix}.${key}` : key;
    //         if (
    //             value !== null &&
    //             typeof value === "object" &&
    //             !Array.isArray(value) &&
    //             !(value instanceof Date)
    //         ) {
    //             Object.assign(result, this.flatten(value, path));
    //         } else {
    //             result[path] = value;
    //         }
    //     }
    //     return result;
    // }
    private generateListingId(): string {
        return `LST${Math.floor(
            1000000 + Math.random() * 9000000
        )}`;
    }
    async saveListing(data: Record<string, any>, auth: AuthContext) {
        const {_id, images, videos, listing_id, status, ...listingData } = data;
        if (_id) {
            const listing = await Listings.findOneAndUpdate(
                {
                    _id,
                    sub: auth.sub,
                    firm_id: auth.firm_id
                },
                { $set:listingData },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (!listing) {
                throw new ApiError(404, "Listing not found");
            }
            // Update media only when media data is provided
            if (images !== undefined || videos !== undefined) {
                const mediaUpdate:Record<string, any> = {};
                if(images!==undefined){
                    // mediaUpdate.images = images;
                    for (const [category, items] of Object.entries(images)) {
                        mediaUpdate[`images.${category}`] = items;
                    }
                }
                if(videos!==undefined){
                    mediaUpdate.videos = videos;
                }
                await Media.findOneAndUpdate(
                    { listing_id: listing._id },
                    { $set: mediaUpdate },
                    {
                        upsert: true,
                        new: true,
                        runValidators:true
                    }
                );
            }
            return {
                created: false,
                listing
            };
        }
        const listing = await Listings.create({
            ...listingData,
            sub: auth.sub,
            firm_id: auth.firm_id,
            listing_id: this.generateListingId(),
            current_step:
                data.current_step ?? OnboardingStep.ESSENTIAL,
            listing_details: {
                ...listingData.listing_details,
                listing_status: ListingStatus.WORK_IN_PROGRESS
            }
        });
        // Create media only when provided
        if (images !== undefined || videos !== undefined) {
            await Media.create({
                listing_id: listing._id,
                ...(images !== undefined && { images }),
                ...(videos !== undefined && { videos })
            });
        }
        return {
            created: true,
            listing
        };
    }
    async getListingById(id: string, auth: AuthContext) {
        const listing = await Listings.findOne({_id:id, sub: auth.sub, firm_id: auth.firm_id});
        if (!listing) {
            throw new ApiError(404, "Listing not found");
        }
        const media = await Media.findOne({ listing_id: listing._id}).lean();
        return {
            ...listing.toObject(),
            images: media?.images ?? {
                apartment: [],
                ext_view_day: [],
                ext_view_night: [],
                amenities: [],
                plans: []
            },
            videos: media?.videos ?? []
        };
    }
    async updateListingStatus(id: string, status: ListingStatus, auth: AuthContext) {
        const listing = await Listings.findOne({_id:id,sub:auth.sub,firm_id:auth.firm_id});
        if(!listing){
            throw new ApiError(404,"Listing data not found !");
        }
        switch(status){
            case ListingStatus.PENDING:{
                throw new ApiError(400,"Cannot perform this action !");
            }
            case ListingStatus.APPROVED:
            case ListingStatus.REJECTED:{
                throw new ApiError(403,"Only the listing owner can perform this action !");
            }
            case ListingStatus.DELISTED:{
                listing.set("listing_details.listing_status", ListingStatus.DELISTED);
                await listing.save();
                return listing;
            }
            case ListingStatus.RELISTED:{
                if (listing.listing_details?.listing_status !== ListingStatus.DELISTED) {
                    throw new ApiError(400, "Only a delisted listing can be relisted");
                }
                const {_id,__v, createdAt, updatedAt, ...listingData} = listing.toObject();
                listingData.listing_id = this.generateListingId();

                //new listing status
                if(listingData.listing_details) {
                    listingData.listing_details.listing_status = ListingStatus.WORK_IN_PROGRESS;
                }
                // new listing creation
                const newListing = await Listings.create(listingData);
                const media = await Media.findOne({listing_id:listing._id}).lean();
                if(media){
                    const {
                        _id:mediaId, 
                        __v:mediaVersion, 
                        createdAt:mediaCreatedAt, 
                        updatedAt:mediaUpdatedAt, 
                        ...mediaData
                    } = media;
                    await Media.create({...mediaData,listing_id:newListing._id});
                }
                return newListing;
            }
            case ListingStatus.DELETED:{
                await Media.deleteMany({listing_id:listing._id});
                await Listings.deleteOne({_id:id, sub:auth.sub, firm_id:auth.firm_id});
                return {_id:id, deleted:true};
            }
            default:{
                throw new ApiError(400, `Unsupported listing status: ${status}`);
            }
        }
    }
    async submitListing(id:string, auth:AuthContext){
        const listing = await Listings.findOne({_id:id, sub:auth.sub, firm_id:auth.firm_id});
        if(!listing){
            throw new ApiError(404, "Listing data not found !");
        }
        if(
            listing.current_step !== OnboardingStep.AMENITIES && 
            listing.current_step !== OnboardingStep.KEY_FEATURES
        ){
            throw new ApiError(400, "Please complete all onboarding steps before submitting the listing !");
        }
        const missingFields = validateListingSubmission(listing.toObject());
        if (missingFields.length > 0){
            throw new ApiError(400, `Please complete the following fields: ${missingFields.join(", ")}`);
        }
        listing.set("listing_details.listing_status",ListingStatus.PENDING);
        await listing.save();
        return listing;
    }
}
const listingService = new ListingService();
export default listingService;

