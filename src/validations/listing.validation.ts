import { z } from "zod";
import * as Constants from "../constants/index.constant.js";
import { objectIdSchema, listingIdSchema, requiredString } from "./common.validation.js";
import { imagesSchema, videoItemSchema } from "./media.validation.js";

// Helpers & Base Schemas
const optionalString = z.string().trim().optional();
const optionalNullableString = optionalString.nullable();
const optionalNumber = z.coerce.number().optional();
const nonNegativeNumber = z.coerce.number().min(0).optional();
const optionalBoolean = z.boolean().optional();
const optionalDate = z.coerce.date().optional();

// Listing Details
export const listingDetailsSchema = z.object({
  listing_status: z.nativeEnum(Constants.ListingStatus).optional(),
  listing_location: optionalString, region: optionalString, sub_region: optionalString, subregion: optionalString, locality: optionalString,
  listing_city: optionalString, project: optionalString, tower: optionalString, unit_no: optionalString, floor_no: optionalString,
  combine_unit_no: z.array(z.string()).optional(),
  UnitFloorPosition: z.nativeEnum(Constants.UnitFloorPosition).optional(),
  towerHide: optionalBoolean, projectHide: optionalBoolean, unitHide: optionalBoolean, floorHide: optionalBoolean, priceHide: optionalBoolean,
  isCustomUnit: optionalBoolean, is_custom_unit: optionalBoolean, share: optionalBoolean,
  selected_unit_id: optionalString, selected_unit_no: optionalString, building_status: optionalString, structure: optionalString,
  building_age: optionalNumber,
  area: z.coerce.number().positive("Area must be greater than 0").optional(),
  area_type: z.nativeEnum(Constants.AreaType).optional(),
  listing_name: optionalString, view: optionalString, property_sub_type: optionalString,
  entry_direction: z.nativeEnum(Constants.Direction).optional(),
  exit_direction: z.nativeEnum(Constants.Direction).optional(),
  project_type: z.nativeEnum(Constants.ProjectType).optional(),
  unit_type: z.nativeEnum(Constants.HomeUnitType).optional(),
  area_unit_type: z.nativeEnum(Constants.AreaUnitType).optional().nullable(),
  plot_area_unit_type: z.nativeEnum(Constants.PlotAreaUnitType).optional(),
  plot_area: optionalNullableString, total_floor: optionalNullableString,
  property_status: z.nativeEnum(Constants.PropertyStatus).optional(),
  possession_timeline: z.nativeEnum(Constants.PossessionTimeline).optional(),
  completion_date: optionalDate,
  passenger_lifts: nonNegativeNumber, service_lifts: nonNegativeNumber,
  flooring: optionalString, flooring_type: optionalString, bhk: optionalString, bhk_type: optionalString,
  no_of_balconies: optionalString, no_of_bathrooms: optionalString, no_of_lifts: optionalString, no_of_parkings: optionalString,
  parking_details: optionalString, parking_type: optionalString, furnishing: optionalString, furnishing_type: optionalString,
  cross_ventilation: z.nativeEnum(Constants.CrossVentilation).optional(),
  natural_light: z.nativeEnum(Constants.NaturalLight).optional(),
  vastu_compliant: z.nativeEnum(Constants.VastuCompliant).optional(),
  pets_allowed: z.nativeEnum(Constants.PetsAllowed).optional(),
  ceiling_height: optionalString, ceiling_height_side: optionalString,
  boundary_wall_type: optionalString, boundary_wall_height: optionalString, boundary_wall_height_side: optionalString,
  gate_type: optionalString, gate_height: optionalString, gate_height_side: optionalString,
  servant_quarters: optionalString, lawn_area: optionalString,
});

// Commercial Details
export const commercialDetailsSchema = z.object({
  property_purpose: z.nativeEnum(Constants.PropertyPurpose).optional(),
  availability_status: optionalString, available_from: optionalDate.nullable(),
  current_occupation_status: z.nativeEnum(Constants.CurrentOccupancy).optional(),
  monthly_rent: nonNegativeNumber, discount_price: nonNegativeNumber, security_amount: nonNegativeNumber,
  property_price: nonNegativeNumber, sale_considration: nonNegativeNumber, sale_consideration: nonNegativeNumber,
  avg_rate_per_sqft: nonNegativeNumber, brokerage_charge: nonNegativeNumber,
  tenantsPreferred: optionalString, transfer_charges: nonNegativeNumber, move_in_charges: nonNegativeNumber,
  registration_charges: nonNegativeNumber, stamp_duty: nonNegativeNumber, maintain_charges: nonNegativeNumber,
  maintenance_included: optionalString, notice_needed: optionalString, internal_notes: optionalString,
});

// Property Details & Address
export const listingPropertyDetailsSchema = z.object({ unit_no: optionalString, project_name: optionalString, tower: optionalString });
export const listingAddressSchema = z.object({
  line_1: optionalString, region: optionalString, sub_region: optionalString, subregion: optionalString, locality: optionalString,
  city: optionalString, listing_city: optionalString, pincode: optionalNumber,
});
export const brokerAndAgentSchema = z.object({ broker_id: optionalString, firm_id: optionalString });

// Other Field Schemas
export const keyFeaturesSchema = z.array(z.string().trim().min(1, "Key feature cannot be empty"));
export const amenitiesSchema = z.array(z.any());
export const furnishingAmenitiesSchema = z.array(z.any());
export const apartmentAmenitiesSchema = z.array(z.string());
export const videosSchema = z.array(videoItemSchema);
export const seoSchema = z.record(z.string(), z.any());

// Field Registry
const listingFieldSchemas = {
  listing_type: z.nativeEnum(Constants.ListingType),
  onboarding_type: z.string(), isCustomUnit: z.boolean(), is_custom_unit: z.boolean(),
  selected_unit_id: z.string(), selected_unit_no: z.string(), coverImageKey: z.string(),
  firm_name: z.string(), broker_name: z.string(), vrTour: z.string(),
  is_personalized: z.boolean(), live: z.boolean(),
  seo: seoSchema, listing_details: listingDetailsSchema, commercial_details: commercialDetailsSchema,
  property_details: listingPropertyDetailsSchema, listing_address: listingAddressSchema,
  broker_and_agent: brokerAndAgentSchema, key_features: keyFeaturesSchema, amenities: amenitiesSchema,
  furnishingAmenities: furnishingAmenitiesSchema, apartmentAmenities: apartmentAmenitiesSchema,
  images: imagesSchema, videos: videosSchema,
} as const;

// Dot Notation Validation
const serverControlledFields = new Set(["_id", "sub", "firm_id", "listing_id", "current_step", "status"]);

export const validateListingData = (data: Record<string, any>) => {
  for (const [key, value] of Object.entries(data)) {
    if (serverControlledFields.has(key)) continue;

    const parts = key.split(".");
    const parent = parts.shift();
    const childPath = parts.join(".");

    if (!parent) throw new Error(`Invalid field: ${key}`);

    const parentSchema = listingFieldSchemas[parent as keyof typeof listingFieldSchemas];
    if (!parentSchema) throw new Error(`Invalid field: ${key}`);

    let fieldSchema: z.ZodTypeAny = parentSchema;

    if (childPath) {
      if (!(parentSchema instanceof z.ZodObject)) {
        throw new Error(`Invalid nested field: ${key}`);
      }

      const shape = parentSchema.shape as Record<string, z.ZodTypeAny>;
      const childSchema = shape[childPath];

      if (!childSchema) throw new Error(`Invalid field: ${key}`);

      fieldSchema = childSchema;
    }

    const result = fieldSchema.safeParse(value);
    if (!result.success) {
      throw new Error(result.error.issues[0]?.message ?? `Invalid value for ${key}`);
    }
  }

  return data;
};

// Status Action
export const listingActionSchema = z.object({
  params: z.object({ id: objectIdSchema }),
  body: z.object({ action: z.nativeEnum(Constants.ListingStatus) }),
});

// Types
export type ListingActionInput = z.infer<typeof listingActionSchema>;
export type ListingUpdateInput = Record<string, any>;