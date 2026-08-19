import { z } from "zod";
import {
  ListingType, ListingStatus, HomeUnitType, UnitFloorPosition, ProjectType, PlotAreaUnitType,
  PropertyStatus, PossessionTimeline, PropertyPurpose, Direction, AreaUnitType, PetsAllowed,
  CurrentOccupancy, AreaType, VastuCompliant, CrossVentilation, NaturalLight, OnboardingStep
} from "../constants/index.constant.js";
import { imagesSchema, videoItemSchema } from "./media.validation.js";

// Helpers
export const objectIdSchema = z.string().trim().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");
export const listingIdSchema = z.string().trim().length(10, "Custom listing_id must be exactly 10 characters");
export const requiredString = (field: string) => z.string().trim().min(1, `${field} is required`);

const nonNegativeNumber = z.coerce.number().min(0);
const optionalString = z.string().trim().optional().nullable();

// Listing Details
export const listingDetailsSchema = z.object({
  listing_status: z.nativeEnum(ListingStatus).optional(),
  listing_location: z.string().optional(),
  region: z.string().optional(),
  sub_region: z.string().optional(),
  subregion: z.string().optional(),
  locality: z.string().optional(),
  listing_city: z.string().optional(),
  project: z.string().optional(),
  tower: z.string().optional(),
  unit_no: z.string().optional(),
  floor_no: z.string().optional(),
  combine_unit_no: z.array(z.string()).default([]),
  UnitFloorPosition: z.nativeEnum(UnitFloorPosition).optional(),
  towerHide: z.boolean().default(false),
  projectHide: z.boolean().default(false),
  unitHide: z.boolean().default(false),
  floorHide: z.boolean().default(false),
  priceHide: z.boolean().default(false),
  isCustomUnit: z.boolean().default(false),
  is_custom_unit: z.boolean().default(false),
  selected_unit_id: z.string().optional(),
  selected_unit_no: z.string().optional(),
  share: z.boolean().optional(),
  building_status: z.string().optional(),
  building_age: z.coerce.number().optional(),
  structure: z.string().optional(),
  area: z.coerce.number().positive("Area must be greater than 0").optional(),
  area_type: z.nativeEnum(AreaType).optional(),
  listing_name: z.string().optional(),
  entry_direction: z.nativeEnum(Direction).optional(),
  exit_direction: z.nativeEnum(Direction).optional(),
  view: z.string().optional(),
  project_type: z.nativeEnum(ProjectType).optional(),
  unit_type: z.nativeEnum(HomeUnitType).optional(),
  property_sub_type: z.string().optional(),
  area_unit_type: z.nativeEnum(AreaUnitType).optional().nullable(),
  plot_area_unit_type: z.nativeEnum(PlotAreaUnitType).optional(),
  plot_area: optionalString,
  property_status: z.nativeEnum(PropertyStatus).optional(),
  possession_timeline: z.nativeEnum(PossessionTimeline).optional(),
  completion_date: z.coerce.date().optional(),
  passenger_lifts: nonNegativeNumber.optional(),
  service_lifts: nonNegativeNumber.optional(),
  total_floor: optionalString,
  flooring: z.string().optional(),
  flooring_type: z.string().optional(),
  bhk: z.string().optional(),
  bhk_type: z.string().optional(),
  no_of_balconies: z.string().optional(),
  no_of_bathrooms: z.string().optional(),
  no_of_lifts: z.string().optional(),
  no_of_parkings: z.string().optional(),
  parking_details: z.string().default(""),
  parking_type: z.string().optional(),
  furnishing: z.string().optional(),
  furnishing_type: z.string().optional(),
  cross_ventilation: z.nativeEnum(CrossVentilation).optional(),
  natural_light: z.nativeEnum(NaturalLight).optional(),
  vastu_compliant: z.nativeEnum(VastuCompliant).optional(),
  pets_allowed: z.nativeEnum(PetsAllowed).optional(),
  ceiling_height: z.string().optional(),
  ceiling_height_side: z.string().optional(),
  boundary_wall_type: z.string().optional(),
  boundary_wall_height: z.string().optional(),
  boundary_wall_height_side: z.string().optional(),
  gate_type: z.string().optional(),
  gate_height: z.string().optional(),
  gate_height_side: z.string().optional(),
  servant_quarters: z.string().optional(),
  lawn_area: z.string().optional()
});

// Commercial Details
export const commercialDetailsSchema = z.object({
  property_purpose: z.nativeEnum(PropertyPurpose).optional(),
  availability_status: z.string().optional(),
  available_from: z.coerce.date().optional().nullable(),
  current_occupation_status: z.nativeEnum(CurrentOccupancy).optional(),
  monthly_rent: nonNegativeNumber.optional(),
  discount_price: nonNegativeNumber.optional(),
  security_amount: nonNegativeNumber.optional(),
  property_price: z.coerce.number().min(0).optional(),
  sale_considration: nonNegativeNumber.optional(),
  sale_consideration: nonNegativeNumber.optional(),
  avg_rate_per_sqft: nonNegativeNumber.optional(),
  brokerage_charge: nonNegativeNumber.optional(),
  tenantsPreferred: z.string().optional(),
  transfer_charges: nonNegativeNumber.optional(),
  move_in_charges: nonNegativeNumber.optional(),
  registration_charges: nonNegativeNumber.optional(),
  stamp_duty: nonNegativeNumber.optional(),
  maintain_charges: nonNegativeNumber.optional(),
  maintenance_included: z.string().optional(),
  notice_needed: z.string().optional(),
  internal_notes: z.string().optional()
});

// Property Details
export const listingPropertyDetailsSchema = z.object({
  unit_no: z.string().optional(),
  project_name: z.string().optional(),
  tower: z.string().optional()
});

// Address
export const listingAddressSchema = z.object({
  line_1: z.string().optional(),
  region: z.string().optional(),
  sub_region: z.string().optional(),
  subregion: z.string().optional(),
  locality: z.string().optional(),
  city: z.string().optional(),
  listing_city: z.string().optional(),
  pincode: z.coerce.number().optional()
});

// Step 1 — Essential
const essentialFields = {
  listing_details: z.object({
    share: z.boolean(),
    property_status: z.nativeEnum(PropertyStatus),
    tower: requiredString("Tower"),
    unit_no: requiredString("Unit number"),
    floor_no: requiredString("Floor number"),
    UnitFloorPosition: z.nativeEnum(UnitFloorPosition),
    total_floor: requiredString("Total floor"),
    listing_name: requiredString("Listing name"),
    project_type: z.nativeEnum(ProjectType)
  }),
  commercial_details: z.object({
    availability_status: requiredString("Availability status"),
    property_price: z.coerce.number().min(0, "Property price cannot be negative")
  }),
  property_details: z.object({
    project_name: requiredString("Project name")
  }),
  listing_address: z.object({
    line_1: requiredString("Address"),
    region: requiredString("Region"),
    subregion: requiredString("Subregion"),
    locality: requiredString("Locality"),
    listing_city: requiredString("Listing city")
  })
};

// Step 2 — Details
const detailsFields = {
  listing_details: z.object({
    bhk_type: requiredString("BHK type"),
    area: z.coerce.number().positive("Area must be greater than 0"),
    area_unit_type: z.nativeEnum(AreaUnitType),
    no_of_bathrooms: requiredString("Number of bathrooms"),
    furnishing: requiredString("Furnishing"),
    exit_direction: z.nativeEnum(Direction)
  })
};

// Step 3 — Key Features
const keyFeaturesFields = {
  key_features: z.array(z.string().trim().min(1, "Key feature cannot be empty")).min(5, "At least 5 key features are required"),
  images: imagesSchema.optional(),
  videos: z.array(videoItemSchema).optional(),
  amenities: z.array(z.any()).optional()
};

// Step 4 — Images
const imagesStepFields = {
  images: imagesSchema
};

// Step 5 — Videos
const videosStepFields = {
  videos: z.array(videoItemSchema)
};

// Step 6 — Amenities
const amenitiesStepFields = {
  amenities: z.array(z.any())
};

// Create Schemas (Note: Step 1 _id is optional, Steps 2-6 require _id)
const essentialCreateSchema = z.object({
  listing_type: z.nativeEnum(ListingType),
  current_step: z.literal(OnboardingStep.ESSENTIAL),
  _id: objectIdSchema.optional(),
  ...essentialFields
});

const detailsCreateSchema = z.object({
  listing_type: z.nativeEnum(ListingType),
  current_step: z.literal(OnboardingStep.DETAILS),
  _id: objectIdSchema,
  ...detailsFields
});

const keyFeaturesCreateSchema = z.object({
  listing_type: z.nativeEnum(ListingType),
  current_step: z.literal(OnboardingStep.KEY_FEATURES),
  _id: objectIdSchema,
  ...keyFeaturesFields
});

const imagesCreateSchema = z.object({
  listing_type: z.nativeEnum(ListingType),
  current_step: z.literal(OnboardingStep.IMAGES),
  _id: objectIdSchema,
  ...imagesStepFields
});

const videosCreateSchema = z.object({
  listing_type: z.nativeEnum(ListingType),
  current_step: z.literal(OnboardingStep.VIDEOS),
  _id: objectIdSchema,
  ...videosStepFields
});

const amenitiesCreateSchema = z.object({
  listing_type: z.nativeEnum(ListingType),
  current_step: z.literal(OnboardingStep.AMENITIES),
  _id: objectIdSchema,
  ...amenitiesStepFields
});

// Create Listing Schema
export const createListingSchema = z.discriminatedUnion("current_step", [
  essentialCreateSchema,
  detailsCreateSchema,
  keyFeaturesCreateSchema,
  imagesCreateSchema,
  videosCreateSchema,
  amenitiesCreateSchema
]);

// Update Schemas (Requires _id for all steps once the listing exists)
const essentialUpdateSchema = z.object({
  listing_type: z.nativeEnum(ListingType),
  current_step: z.literal(OnboardingStep.ESSENTIAL),
  _id: objectIdSchema,
  ...essentialFields
});

const detailsUpdateSchema = z.object({
  listing_type: z.nativeEnum(ListingType),
  current_step: z.literal(OnboardingStep.DETAILS),
  _id: objectIdSchema,
  ...detailsFields
});

const keyFeaturesUpdateSchema = z.object({
  listing_type: z.nativeEnum(ListingType),
  current_step: z.literal(OnboardingStep.KEY_FEATURES),
  _id: objectIdSchema,
  ...keyFeaturesFields
});

const imagesUpdateSchema = z.object({
  listing_type: z.nativeEnum(ListingType),
  current_step: z.literal(OnboardingStep.IMAGES),
  _id: objectIdSchema,
  ...imagesStepFields
});

const videosUpdateSchema = z.object({
  listing_type: z.nativeEnum(ListingType),
  current_step: z.literal(OnboardingStep.VIDEOS),
  _id: objectIdSchema,
  ...videosStepFields
});

const amenitiesUpdateSchema = z.object({
  listing_type: z.nativeEnum(ListingType),
  current_step: z.literal(OnboardingStep.AMENITIES),
  _id: objectIdSchema,
  ...amenitiesStepFields
});

// Update Listing Schema
export const updateListingSchema = z.discriminatedUnion("current_step", [
  essentialUpdateSchema,
  detailsUpdateSchema,
  keyFeaturesUpdateSchema,
  imagesUpdateSchema,
  videosUpdateSchema,
  amenitiesUpdateSchema
]);

// Common Updates
export const updateListingCommonSchema = z.object({
  broker_and_agent: z.object({
    broker_id: z.string().optional(),
    firm_id: z.string().optional()
  }).partial().optional(),
  furnishingAmenities: z.array(z.any()).optional(),
  apartmentAmenities: z.array(z.string()).optional(),
  vrTour: z.string().optional(),
  coverImageKey: z.string().optional(),
  is_personalized: z.boolean().optional(),
  seo: z.record(z.string(), z.any()).optional()
});

// Status Action
export const listingActionSchema = z.object({
  params: z.object({
    id: objectIdSchema
  }),
  body: z.object({
    action: z.nativeEnum(ListingStatus)
  })
});

// Root Listing
export const rootListingSchema = z.object({
  listing_type: z.nativeEnum(ListingType),
  listing_details: listingDetailsSchema,
  commercial_details: commercialDetailsSchema,
  property_details: listingPropertyDetailsSchema,
  listing_address: listingAddressSchema,
  broker_and_agent: z.object({
    broker_id: z.string().optional(),
    firm_id: z.string().optional()
  }),
  key_features: z.array(z.string()).min(5),
  amenities: z.array(z.any()).default([]),
  furnishingAmenities: z.array(z.any()).default([]),
  apartmentAmenities: z.array(z.string()).default([]),
  onboarding_type: z.string().default("normal"),
  isCustomUnit: z.boolean().default(false),
  is_custom_unit: z.boolean().default(false),
  selected_unit_id: z.string().optional(),
  selected_unit_no: z.string().optional(),
  coverImageKey: z.string().default(""),
  firm_name: z.string().optional(),
  broker_name: z.string().optional(),
  vrTour: z.string().default(""),
  is_personalized: z.boolean().default(false),
  seo: z.record(z.string(), z.any()).default({}),
  live: z.boolean().default(true),
  listing_id: listingIdSchema
});

// Types
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
export type ListingActionInput = z.infer<typeof listingActionSchema>;