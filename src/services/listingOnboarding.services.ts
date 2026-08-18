import Listings from "../models/listing.model.js";
import Media from "../models/media.model.js";
import { ListingStatus, OnboardingStep } from "../constants/index.constant.js";
import { ApiError } from "../utils/apiError.js";
import type { CreateListingInitInput } from "../validations/listing.validation.js";

type AuthContext ={
    sub: string;
    firm_id: string;
};

class ListingService {
    //generate custom listing id
    private generateListingId(): string {
        const number = Math.floor(1000000 + Math.random() * 9000000);
        return `LST${number}`;
    }

    private rejectMongoOperatorKeys(obj: Record<string, any>, path = "root"): void {
        for (const [key, value] of Object.entries(obj)) {
            if (key.startsWith("$")) {
                throw new ApiError(400, `Invalid update field: ${key} is not allowed.`);
            }

            if (value && typeof value === "object" && !Array.isArray(value)) {
                this.rejectMongoOperatorKeys(value, `${path}.${key}`);
            }
        }
    }

    private flattenUpdateData(obj: Record<string, any>, prefix = ""): Record<string, any> {
        const result: Record<string, any> = {};

        for (const [key, value] of Object.entries(obj)) {
            if (value === undefined) continue;

            const fieldPath = prefix ? `${prefix}.${key}` : key;

            if (value && typeof value === "object" && !Array.isArray(value)) {
                Object.assign(result, this.flattenUpdateData(value, fieldPath));
                continue;
            }

            result[fieldPath] = value;
        }

        return result;
    }

    async createListing(validatedData:CreateListingInitInput, authContext: AuthContext) {
        if (!authContext.sub) {
            throw new ApiError(401, "User authentication required");
        }
        if (!authContext.firm_id) {
            throw new ApiError(400, "Firm information missing");
        }

        const existingListing = await Listings.findOne({ sub: authContext.sub, firm_id: authContext.firm_id });
        if (existingListing) {
            return { existing: true, listing: existingListing };
        }

        const listing_id = this.generateListingId();

        const listingDetails = {
            ...(validatedData.listing_details ?? {}),
            listing_status: ListingStatus.WORK_IN_PROGRESS,
            listing_city: validatedData.listing_details?.listing_city || validatedData.listing_city || validatedData.city || "",
            listing_name: validatedData.listing_details?.listing_name || validatedData.listing_name || "",
            project: validatedData.listing_details?.project ?? validatedData.project,
            tower: validatedData.listing_details?.tower ?? validatedData.tower,
            unit_no: validatedData.listing_details?.unit_no ?? validatedData.unit_no,
            floor_no: validatedData.listing_details?.floor_no ?? validatedData.floor_no,
            UnitFloorPosition: validatedData.listing_details?.UnitFloorPosition ?? validatedData.UnitFloorPosition,
            total_floor: validatedData.listing_details?.total_floor ?? validatedData.total_floor,
            property_status: validatedData.listing_details?.property_status ?? validatedData.property_status,
            possession_timeline: validatedData.listing_details?.possession_timeline ?? validatedData.possession_timeline,
            project_type: validatedData.listing_details?.project_type ?? validatedData.project_type,
            plot_area: validatedData.listing_details?.plot_area ?? validatedData.plot_area,
            area_unit_type: validatedData.listing_details?.area_unit_type ?? validatedData.area_unit_type,
            share: validatedData.listing_details?.share ?? validatedData.share,
            unit_type: validatedData.listing_details?.unit_type ?? validatedData.unit_type,
            no_of_balconies: validatedData.listing_details?.no_of_balconies,
            no_of_bathrooms: validatedData.listing_details?.no_of_bathrooms,
            no_of_parkings: validatedData.listing_details?.no_of_parkings,
            passenger_lifts: validatedData.no_of_passengers_lifts ?? 0,
            service_lifts: validatedData.no_of_service_lifts ?? 0
        };

        const commercialDetails = {
            ...(validatedData.commercial_details ?? {}),
            property_purpose: validatedData.commercial_details?.property_purpose ?? validatedData.property_purpose,
            availability_status: validatedData.commercial_details?.availability_status ?? validatedData.availability_status,
            available_from: validatedData.commercial_details?.available_from ? new Date(validatedData.commercial_details.available_from as any) : validatedData.available_from ? new Date(validatedData.available_from) : undefined,
            property_price: validatedData.commercial_details?.property_price ?? validatedData.property_price
        };

        const propertyDetails = {
            ...(validatedData.property_details ?? {}),
            unit_no: validatedData.property_details?.unit_no ?? validatedData.unit_no,
            project_name: validatedData.property_details?.project_name ?? validatedData.project_name,
            tower: validatedData.property_details?.tower ?? validatedData.tower
        };

        const listingAddress = {
            ...(validatedData.listing_address ?? {}),
            line_1: validatedData.listing_address?.line_1 ?? validatedData.line_1,
            region: validatedData.listing_address?.region ?? validatedData.region,
            subregion: validatedData.listing_address?.subregion ?? validatedData.subregion,
            locality: validatedData.listing_address?.locality ?? validatedData.locality,
            city: validatedData.listing_address?.city ?? validatedData.city ?? (validatedData.listing_city || ""),
            listing_city: validatedData.listing_address?.listing_city ?? validatedData.listing_city ?? (validatedData.city || ""),
            pincode: validatedData.listing_address?.pincode ?? validatedData.pincode
        };

        Object.keys(listingDetails).forEach((key) => {
            if ((listingDetails as any)[key] === undefined) delete (listingDetails as any)[key];
        });
        Object.keys(commercialDetails).forEach((key) => {
            if ((commercialDetails as any)[key] === undefined) delete (commercialDetails as any)[key];
        });
        Object.keys(propertyDetails).forEach((key) => {
            if ((propertyDetails as any)[key] === undefined) delete (propertyDetails as any)[key];
        });
        Object.keys(listingAddress).forEach((key) => {
            if ((listingAddress as any)[key] === undefined) delete (listingAddress as any)[key];
        });

        const listingPayload: Record<string, any> = {
            sub: authContext.sub,
            firm_id: authContext.firm_id,
            listing_type: validatedData.listing_type,
            listing_id,
            current_step: validatedData.current_step ?? OnboardingStep.ESSENTIAL,
            status: [
                {
                    code: ListingStatus.WORK_IN_PROGRESS,
                    remark: "Listing created",
                    updated_by: {
                        name: "System",
                        user_id: String(authContext.sub)
                    },
                    timestamp: new Date()
                }
            ],
            listing_details: listingDetails,
            commercial_details: commercialDetails,
            property_details: propertyDetails,
            listing_address: listingAddress
        };

        const listing = await Listings.create(listingPayload);
        return { existing: false, listing };
    }
    // get onboarding data based on the id
    async getListingById(listingId:string, authContext: AuthContext) {
        if (!authContext.sub || !authContext.firm_id) {
            throw new ApiError(401, "User authentication required");
        }
        const listing = await Listings.findOne({
            _id: listingId,
            sub: authContext.sub,
            firm_id: authContext.firm_id
        });
        if (!listing) {
            throw new ApiError(404, "Listing not found");
        }

        const media = await Media.findOne({ listing_id: listing._id }).lean();
        return {
            ...listing.toObject(),
            images: media?.images ?? { apartment: [], ext_view_day: [], ext_view_night: [], amenities: [], plans: [] },
            videos: media?.videos ?? []
        };
    }

    // update the onboarding data (patch)
    async updateListing(listingId: string, data: Record<string, any>,authContext: AuthContext) {
        if (!authContext.sub || !authContext.firm_id) {
            throw new ApiError(401, "User authentication required");
        }

        const { _id, sub, firm_id, listing_id, status, ...updateData } = data;
        this.rejectMongoOperatorKeys(updateData);
        const setData = this.flattenUpdateData(updateData);

        const listing = await Listings.findOneAndUpdate(
            {
                _id: listingId,
                sub: authContext.sub,
                firm_id: authContext.firm_id
            },
            { $set: setData },
            { new: true }
        );

        if (!listing) {
            throw new ApiError(404, "Listing not found");
        }
        return listing;
    }
    async updateListingStatus(listingId: string, status: ListingStatus,remark: string | undefined,authContext: AuthContext) {
        if (!authContext.sub || !authContext.firm_id) {
            throw new ApiError(401, "User authentication required");
        }
        const listing = await Listings.findOne({
            _id: listingId,
            sub: authContext.sub,
            firm_id: authContext.firm_id
        });
        if (!listing) {
            throw new ApiError(404, "Listing not found");
        }
        // Approved and Rejected can ONLY be done by owner
        // if (status === ListingStatus.APPROVED || status === ListingStatus.REJECTED) {
        //     if (listing.sub !== authContext.sub) {
        //         const error: any = new Error(
        //             "Only the property owner can approve or reject the listing"
        //         );
        //         error.statusCode = 403;
        //         throw error;
        //     }
        // }
        if (status === ListingStatus.APPROVED || status === ListingStatus.REJECTED) {
            throw new ApiError(403, "Only the property owner can approve or reject the listing");
        }
        const statusEntry = {
            code: status,
            remark: remark || "",
            updated_by: {
                name: "Current User",
                user_id: String(authContext.sub)
            },
            timestamp: new Date()
        };

        const updatedListing = await Listings.findOneAndUpdate(
            {
                _id: listingId,
                sub: authContext.sub,
                firm_id: authContext.firm_id
            },
            { $push: { status: statusEntry } },
            { new: true }
        );

        if (!updatedListing) {
            throw new ApiError(404, "Listing not found");
        }
        return updatedListing;
    }
}
export default new ListingService();
