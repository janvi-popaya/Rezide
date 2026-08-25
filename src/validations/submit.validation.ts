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

    if (!Array.isArray(listing.key_features) || listing.key_features.length < 5) {
        errors.push("key_features (minimum 5 required)");
    }

    if (!details?.availability_status) {
        errors.push("listing_details.availability_status");
    }

    if (!details?.line_1) {
        errors.push("listing_details.line_1");
    }
    if (!details?.available_from) {
        errors.push("listing_details.available_from");
    }

    if (!details?.property_purpose) {
        errors.push("listing_details.property_purpose");
    }
    if (!details?.pincode) {
        errors.push("listing_details.pincode");
    }
    if (!details?.unit_no) {
        errors.push("listing_details.unit_no");
    }
    if (!details?.total_floor) {
        errors.push("listing_details.total_floor");
    }
    if (!details?.floor_no) {
        errors.push("listing_details.floor_no");
    }
    if (!details?.listing_name) {
        errors.push("listing_details.listing_name");
    }
    if (!details?.plot_area) {
        errors.push("listing_details.plot_area");
    }
    if (!details?.area) {
        errors.push("listing_details.area");
    }
    if (!details?.area_unit_type) {
        errors.push("listing_details.area_unit_type");
    }
    if (!details?.ceiling_height) {
        errors.push("listing_details.ceiling_height");
    }
    if (!details?.ceiling_height_side) {
        errors.push("listing_details.ceiling_height_side");
    }
    if (!details?.visit_day) {
        errors.push("listing_details.visit_day");
    }
    if (!details?.start_time) {
        errors.push("listing_details.start_time");
    }
    if (!details?.end_time) {
        errors.push("listing_details.end_time");
    }
    if (!details?.notice_needed) {
        errors.push("listing_details.notice_needed");
    }
    if (!details?.current_occupation_status) {
        errors.push("listing_details.current_occupation_status");
    }
    if (!details?.brokerage_terms) {
        errors.push("listing_details.brokerage_terms");
    }
    if (!details?.discount_price) {
        errors.push("listing_details.discount_price");
    }
    if (!details?.brokerage_charge) {
        errors.push("listing_details.brokerage_charge");
    }
    if (!details?.transfer_charges) {
        errors.push("listing_details.transfer_charges");
    }
    if (!details?.registration_charges) {
        errors.push("listing_details.registration_charges");
    }
    if (!details?.stamp_duty) {
        errors.push("listing_details.stamp_duty");
    }
    if (!details?.internal_notes) {
        errors.push("listing_details.internal_notes");
    }
    if (!details?.share) {
        errors.push("listing_details.share");
    }
};

const validateListingTypeFields = (listing: Record<string, any>, errors: string[]) => {
    const details = listing.listing_details;

    switch (listing.listing_type) {
        case Constants.ListingType.HOME: {
            if (!details?.no_of_bathrooms) {
                errors.push("listing_details.no_of_bathrooms");
            }
            if (!details?.no_of_balconies) {
                errors.push("listing_details.no_of_balconies");
            }
            if (!details?.cross_ventilation) {
                errors.push("listing_details.cross_ventilation");
            }
            if (!details?.natural_light) {
                errors.push("listing_details.natural_light");
            }
            if (!details?.parking_type) {
                errors.push("listing_details.parking_type");
            }
            break;
        }
        case Constants.ListingType.OFFICE: {
            if (!details?.no_of_seats) {
                errors.push("listing_details.no_of_seats");
            }
          
            if (!details?.no_of_cabins) {
                errors.push("listing_details.no_of_cabins");
            }
           
            if (!details?.no_of_meeting_rooms) {
                errors.push("listing_details.no_of_meeting_rooms");
            }
          
            if (!details?.reception_area) {
                errors.push("listing_details.reception_area");
            }
         
            if (!details?.pantry) {
                errors.push("listing_details.pantry");
            }
            
            if (!details?.no_of_private_washroom) {
                errors.push("listing_details.no_of_private_washroom");
            }
        
            if (!details?.no_of_common_washroom) {
                errors.push("listing_details.no_of_common_washroom");
            }
         
            if (!details?.monthly_rent) {
                errors.push("listing_details.monthly_rent");
            }
        
            if (!details?.security_amount) {
                errors.push("listing_details.security_amount");
            }
          
            if (!details?.no_of_private_parkings) {
                errors.push("listing_details.no_of_private_parkings");
            }
         
            if (!details?.cam_charges) {
                errors.push("listing_details.cam_charges");
            }
         
            if (!details?.building_plan_approval) {
                errors.push("listing_details.building_plan_approval");
            }
           
            if (!details?.fire_noc) {
                errors.push("listing_details.fire_noc");
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