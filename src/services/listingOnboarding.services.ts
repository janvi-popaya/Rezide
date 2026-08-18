import Listings from "../models/listing.model.js";
import { OnboardingStep } from "../constants/index.constant.js";
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
    async createListing(validatedData:CreateListingInitInput, authContext: AuthContext) {
        if (!authContext.sub) {
            const error: any = new Error("User authentication required");
            error.statusCode = 401;
            throw error;
        }
        if (!authContext.firm_id) {
            const error: any = new Error("Firm information missing");
            error.statusCode = 400;
            throw error;
        }
        const existingListing = await Listings.findOne({sub:authContext.sub, firm_id:authContext.firm_id});
        if (existingListing) {
            return { existing: true, listing: existingListing };
        }
        const listing_id = this.generateListingId();
        const listing = await Listings.create({
            sub: authContext.sub,
            firm_id: authContext.firm_id,
            listing_type: validatedData.listing_type,
            listing_id,
            current_step: OnboardingStep.ESSENTIAL
        });
        return { existing: false, listing };
    }
    // get onboarding data based on the id
    async getListingById(listingId:string, authContext: AuthContext) {
        if (!authContext.sub || !authContext.firm_id) {
            const error: any = new Error("User authentication required");
            error.statusCode = 401;
            throw error;
        }
        const listing = await Listings.findOne({
            _id: listingId,
            sub: authContext.sub,
            firm_id: authContext.firm_id
        });
        if (!listing) {
            const error: any = new Error("Listing not found");
            error.statusCode = 404;
            throw error;
        }
        return listing;
    }

    // update the onboarding data (patch)
    async updateListing(listingId: string, data: Record<string, any>,authContext: AuthContext) {
        if (!authContext.sub || !authContext.firm_id) {
            const error: any = new Error("User authentication required");
            error.statusCode = 401;
            throw error;
        }
        const listing = await Listings.findOne({
            _id: listingId,
            sub: authContext.sub,
            firm_id: authContext.firm_id
        });
        if (!listing) {
            const error: any = new Error("Listing not found");
            error.statusCode = 404;
            throw error;
        }
        // Protect immutable/sensitive fields
        const { _id, sub, firm_id, listing_id, status, ...updateData } = data;

        for (const [key, value] of Object.entries(updateData)) {
            const currentValue = listing.get(key);

            if (
                value &&
                typeof value === "object" &&
                !Array.isArray(value) &&
                currentValue &&
                typeof currentValue === "object" &&
                !Array.isArray(currentValue)
            ) {
                listing.set(key, {
                ...(currentValue.toObject?.() ?? currentValue),
                ...value
                });
                continue;
            }
            listing.set(key, value);
        }
        await listing.save();
        return listing;
    }
    // current step update logic
    async updateStep(listingId: string, currentStep: OnboardingStep, authContext: AuthContext) {
        if (!authContext.sub || !authContext.firm_id) {
            const error: any = new Error("User authentication required");
            error.statusCode = 401;
            throw error;
        }
        const listing = await Listings.findOne({
            _id: listingId,
            sub: authContext.sub,
            firm_id: authContext.firm_id
        });
        if (!listing) {
            const error: any = new Error("Listing not found");
            error.statusCode = 404;
            throw error;
        }
        listing.current_step = currentStep;
        await listing.save();
        return listing;
    }
}
export default new ListingService();
