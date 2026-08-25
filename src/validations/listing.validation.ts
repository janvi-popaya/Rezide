import { z } from "zod";
import * as Constants from "../constants/index.constant.js";
import { ApiError } from "../utils/apiError.js";

// Reusable Validators
export const objectIdSchema = z.string().trim().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");
const optionalString = z.string().trim().optional();
const optionalNullableString = z.string().trim().optional().nullable();
const optionalNumber = z.coerce.number().optional();
const nonNegativeNumber = z.coerce.number().min(0).optional();
const optionalBoolean = z.boolean().optional();
const optionalDate = z.coerce.date().optional();

// Flat Listing Field Validation
const listingFieldSchemas: Record<string, z.ZodTypeAny> = {
  _id:objectIdSchema.optional(),

  // Listing
  "listing_type": z.nativeEnum(Constants.ListingType),
  "current_step": z.nativeEnum(Constants.OnboardingStep),
  "listing_id": z.string().trim().length(10, "Listing ID must be exactly 10 characters"),
  "onboarding_type": z.string().trim(),
  "lastUpdate": z.coerce.date(),
  "firm_name": optionalString,
  "broker_name": optionalString,
  "is_personalized": optionalBoolean,

  // Listing Details
  "listing_details.listing_status": z.nativeEnum(Constants.ListingStatus).optional(),
  "listing_details.listing_location": optionalString,
  "listing_details.project": optionalString,
  "listing_details.tower": optionalString,
  "listing_details.unit_no": optionalString,
  "listing_details.floor_no": optionalString,
  "listing_details.combine_unit_no": z.array(z.string()).optional(),
  "listing_details.UnitFloorPosition": z.nativeEnum(Constants.UnitFloorPosition).optional(),
  "listing_details.towerHide": optionalBoolean,
  "listing_details.projectHide": optionalBoolean,
  "listing_details.unitHide": optionalBoolean,
  "listing_details.floorHide": optionalBoolean,
  "listing_details.isCustomUnit": optionalBoolean,
  "listing_details.share": optionalBoolean,
  "listing_details.area": z.coerce.number().positive("Area must be greater than 0").optional(),
  "listing_details.area_type": z.nativeEnum(Constants.AreaType).optional(),
  "listing_details.listing_name": optionalString,
  "listing_details.entry_direction": z.nativeEnum(Constants.Direction).optional(),
  "listing_details.exit_direction": z.nativeEnum(Constants.Direction).optional(),
  "listing_details.view": optionalString,
  "listing_details.project_type": z.nativeEnum(Constants.ProjectType).optional(),
  "listing_details.unit_type": z.nativeEnum(Constants.HomeUnitType).optional(),
  "listing_details.area_unit_type": z.nativeEnum(Constants.AreaUnitType).optional(),
  "listing_details.plot_area_unit_type": z.nativeEnum(Constants.PlotAreaUnitType).optional(),
  "listing_details.plot_area": optionalNullableString,
  "listing_details.property_status": z.nativeEnum(Constants.PropertyStatus).optional(),
  "listing_details.possession_timeline": z.nativeEnum(Constants.PossessionTimeline).optional(),
  "listing_details.completion_date": optionalDate,
  "listing_details.no_of_service_lifts": nonNegativeNumber,
  "listing_details.total_floor": optionalString,
  "listing_details.flooring": optionalString,
  "listing_details.flooring_type": optionalString,
  "listing_details.bhk": optionalString,
  "listing_details.bhk_type": optionalString,
  "listing_details.no_of_balconies": optionalString,
  "listing_details.no_of_bathrooms": optionalString,
  "listing_details.no_of_passengers_lifts": optionalString,
  "listing_details.no_of_parkings": optionalString,
  "listing_details.cross_ventilation": z.nativeEnum(Constants.CrossVentilation).optional(),
  "listing_details.natural_light": z.nativeEnum(Constants.NaturalLight).optional(),
  "listing_details.furnishing": optionalString,
  "listing_details.furnishing_type": optionalString,
  "listing_details.ceiling_height": optionalString,
  "listing_details.ceiling_height_side": optionalString,
  "listing_details.vastu_compliant": z.nativeEnum(Constants.VastuCompliant).optional(),
  "listing_details.pets_allowed": z.nativeEnum(Constants.PetsAllowed).optional(),

  // Listing Details - Office Page & Additional Fields
  "listing_details.no_of_seats": optionalString,
  "listing_details.no_of_cabins": optionalString,
  "listing_details.no_of_meeting_rooms": optionalString,
  "listing_details.reception_area": z.nativeEnum(Constants.YesAndNo).optional(),
  "listing_details.pantry": z.nativeEnum(Constants.YesAndNo).optional(),
  "listing_details.no_of_private_washroom": optionalString,
  "listing_details.no_of_common_washroom": optionalString,
  "listing_details.no_of_private_parkings": optionalString,
  "listing_details.no_of_conference_rooms": optionalString,
  "listing_details.lobby": z.nativeEnum(Constants.YesAndNo).optional(),
  "listing_details.refuge": z.nativeEnum(Constants.YesAndNo).optional(),
  "listing_details.food_court_cafeteria": z.nativeEnum(Constants.YesAndNo).optional(),

  "listing_details.building_status": optionalString,
  "listing_details.building_age": nonNegativeNumber,
  "listing_details.structure": optionalString,
  "listing_details.boundary_wall_type": optionalString,
  "listing_details.boundary_wall_height": optionalString,
  "listing_details.boundary_wall_height_side": optionalString,
  "listing_details.gate_type": optionalString,
  "listing_details.gate_height": optionalString,
  "listing_details.gate_height_side": optionalString,
  "listing_details.servant_quarters": z.nativeEnum(Constants.YesAndNo).optional(),
  "listing_details.lawn_area": optionalString,

  // Commercial Details
  "commercial_details.parking_type": optionalString,
  "commercial_details.property_purpose": z.nativeEnum(Constants.PropertyPurpose).optional(),
  "commercial_details.availability_status": optionalString,
  "commercial_details.priceHide": optionalBoolean,
  "commercial_details.available_from": z.coerce.date().optional().nullable(),
  "commercial_details.current_occupation_status": z.nativeEnum(Constants.CurrentOccupancy).optional(),
  "commercial_details.visit_day": z.nativeEnum(Constants.VisitDay).optional(),
  "commercial_details.particular_day": z.nativeEnum(Constants.Day).optional().nullable(),
  "commercial_details.start_time": optionalString,
  "commercial_details.end_time": optionalString,
  "commercial_details.discount_price": nonNegativeNumber,
  "commercial_details.security_amount": nonNegativeNumber,
  "commercial_details.property_price": nonNegativeNumber,
  "commercial_details.avg_rate_per_sqft": nonNegativeNumber,
  "commercial_details.brokerage_charge": nonNegativeNumber,
  "commercial_details.tenantsPreferred": optionalString,
  "commercial_details.transfer_charges": nonNegativeNumber,
  "commercial_details.registration_charges": nonNegativeNumber,
  "commercial_details.stamp_duty": nonNegativeNumber,
  "commercial_details.brokerage_terms": z.nativeEnum(Constants.BrokerageTerms).optional(),
  "commercial_details.maintenance_charges": nonNegativeNumber,
  "commercial_details.maintenance_included": optionalString,
  "commercial_details.notice_needed": z.nativeEnum(Constants.NoticeNeededDuration).optional(),
  "commercial_details.internal_notes": optionalString,

  // Commercial Details - Office Page Fields
  "commercial_details.monthly_rent": nonNegativeNumber,
  "commercial_details.cam_charges": nonNegativeNumber,
  "commercial_details.building_plan_approval": z.nativeEnum(Constants.YesAndNo).optional(),
  "commercial_details.fire_noc": z.nativeEnum(Constants.YesAndNo).optional(),
  "commercial_details.move_in_charges": nonNegativeNumber,
  "commercial_details.sale_consideration": nonNegativeNumber,


  // Broker & Agent
  "broker_and_agent.sub": z.string().trim().min(1),
  "broker_and_agent.firm_id": objectIdSchema,

  // Key Features
  "key_features": z.array(z.string().trim().min(1, "Key feature cannot be empty")),

  // Property Details
  "property_details.unit_no": optionalString,
  "property_details.project_name": optionalString,
  "property_details.tower": optionalString,

  // Listing Address
  "listing_address.line_1": optionalString,
  "listing_address.region": optionalString,
  "listing_address.subregion": optionalString,
  "listing_address.locality": optionalString,
  "listing_address.city": optionalString,
  "listing_address.pincode": optionalNumber,

  // Amenities
  "furnishingAmenities": z.array(z.any()),
  "apartmentAmenities": z.array(z.string())
};

export const validateListingData = (data: Record<string, any>) => {
  for (const [key, value] of Object.entries(data)) {
    // Server controlled fields
    if (key === "sub" || key === "firm_id" || key === "listing_id") {
      throw new ApiError(400, `Field cannot be provided: ${key}`);
    }
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      throw new ApiError(400, `Provide '${key}' data in dot notation form`);
    }
    // Normal listing field
    const schema = listingFieldSchemas[key];
    if (!schema) {
      throw new ApiError(400, `Invalid field: ${key}`);
    }

    const result = schema.safeParse(value);
    if (!result.success) {
      throw new ApiError(
        400,
        result.error.issues[0]?.message ?? `Invalid value for ${key}`
      );
    }
  }
  return data;
};
// Status Action
export const listingActionSchema = z.object({
  params: z.object({ id: objectIdSchema }),
  body: z.object({ action: z.nativeEnum(Constants.ListingStatus) })
})