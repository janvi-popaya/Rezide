import * as Constants from "../constants/index.constant.js";

const validateCommonSubmissionFields = (listing: Record<string, any>, errors: string[]) => {
    const details = listing.listing_details;
    
    if (!listing.listing_type) {
        errors.push("listing_type");
    }

    if (!details?.listing_location) {
        errors.push("listing_details.listing_location");
    }

    if (!details?.region) {
        errors.push("listing_details.region");
    }

    console.log("commit testing")

    if (!details?.sub_region) {
        errors.push("listing_details.sub_region");
    }

    if (!details?.subregion) {
        errors.push("listing_details.subregion");
    }

    if (!details?.locality) {
        errors.push("listing_details.locality");
    }

    if (!details?.listing_city) {
        errors.push("listing_details.listing_city");
    }

    if (
        details?.area === undefined ||
        details?.area === null
    ) {
        errors.push("listing_details.area");
    }

    if (!details?.area_type) {
        errors.push("listing_details.area_type");
    }

    if (!details?.project_type) {
        errors.push("listing_details.project_type");
    }

    if (!details?.property_status) {
        errors.push("listing_details.property_status");
    }

    if (!details?.possession_timeline) {
        errors.push(
            "listing_details.possession_timeline"
        );
    }

    if (!Array.isArray(listing.key_features) || listing.key_features.length < 5) {
        errors.push("key_features (minimum 5 required)");
    }
};

const validateListingTypeFields = (listing: Record<string, any>, errors: string[]) => {
    const details = listing.listing_details;

    switch (listing.listing_type) {
        case Constants.ListingType.HOME: {
            if (!details?.unit_type) {
                errors.push("listing_details.unit_type");
            }
            break;
        }
        case Constants.ListingType.OFFICE: {
            if (!details?.unit_type) {
                errors.push("listing_details.unit_type");
            }
            break;
        }
        case Constants.ListingType.INDUSTRIAL: {
            if (details?.plot_area === undefined || details?.plot_area === null) {
                errors.push("listing_details.plot_area");
            }
            if (!details?.plot_area_unit_type) {
                errors.push("listing_details.plot_area_unit_type");
            }
            break;
        }
        default:
            break;
    }
};

const validateUnitTypeFields = (listing: Record<string, any>, errors: string[]) => {
    const details = listing.listing_details;
    if (listing.listing_type !== Constants.ListingType.HOME) {
        return;
    }
    switch (details?.unit_type) {
        case Constants.HomeUnitType.APARTMENT: {
            if (!details?.project) {
                errors.push("listing_details.project");
            }
            if (!details?.tower) {
                errors.push("listing_details.tower");
            }
            if (!details?.unit_no) {
                errors.push("listing_details.unit_no");
            }
            if (!details?.floor_no) {
                errors.push("listing_details.floor_no");
            }
            if (!details?.bhk) {
                errors.push("listing_details.bhk");
            }
            break;
        }
        case Constants.HomeUnitType.VILLA: {
            if (!details?.bhk) {
                errors.push("listing_details.bhk");
            }
            if (!details?.lawn_area) {
                errors.push("listing_details.lawn_area");
            }
            break;
        }
        default:
            break;
    }
};
export const validateListingSubmission = (listing: Record<string, any>): string[] => {
    const errors: string[] = [];
    //Common fields required for every listing
    validateCommonSubmissionFields(listing, errors);

    //Fields based on listing_type
    validateListingTypeFields(listing, errors);

    //Fields based on unit_type
    validateUnitTypeFields(listing, errors);

    return errors;
};