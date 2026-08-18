import { z } from "zod";
import {
  ListingType, ListingStatus, HomeUnitType, UnitFloorPosition,
  ProjectType, PlotAreaUnitType, PropertyStatus, PossessionTimeline,
  PropertyPurpose, Direction, AreaUnitType, PetsAllowed, VisitDay, Day,
  BrokerageTerms, NoticeNeededDuration, CurrentOccupancy, AreaType,
  VastuCompliant, CrossVentilation, NaturalLight, OnboardingStep
} from "../constants/index.constant.js";

// Helpers
export const objectIdSchema = z.string().trim().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");
export const listingIdSchema = z.string().trim().length(10, "Custom listing_id must be exactly 10 characters");
export const requiredString = (field: string) => z.string().trim().min(1, `${field} is required`);

const nonNegativeNumber = z.coerce.number().min(0).default(0);
const optionalString = z.string().trim().optional().nullable();

// Status History Schema
export const statusHistorySchema = z.object({
  code: z.nativeEnum(ListingStatus),
  remark: z.string().default(""),
  updated_by: z.object({
    name: requiredString("Updated By Name"),
    user_id: objectIdSchema
  }),
  timestamp: z.any()
});

// Listing Details Sub-schema
export const listingDetailsSchema = z.object({
  listing_status: z.nativeEnum(ListingStatus),
  listing_location: requiredString("Listing location"),
  region: requiredString("Region"),
  sub_region: requiredString("Sub region"),
  subregion: requiredString("Subregion"),
  locality: requiredString("Locality"),
  listing_city: requiredString("Listing city"),

  project: objectIdSchema,
  tower: objectIdSchema,
  unit_no: objectIdSchema,
  floor_no: requiredString("Floor number"),
  combine_unit_no: z.array(objectIdSchema).default([]),
  UnitFloorPosition: z.nativeEnum(UnitFloorPosition),

  towerHide: z.boolean().default(false),
  projectHide: z.boolean().default(false),
  unitHide: z.boolean().default(false),
  floorHide: z.boolean().default(false),
  priceHide: z.boolean().default(false),

  isCustomUnit: z.boolean().default(false),
  is_custom_unit: z.boolean().default(false),
  selected_unit_id: objectIdSchema,
  selected_unit_no: requiredString("Selected unit number"),
  share: z.boolean().default(true),

  building_status: requiredString("Building status"),
  building_age: z.coerce.number(),
  area: z.coerce.number().positive("Area must be greater than 0"),
  area_type: z.nativeEnum(AreaType),

  listing_name: requiredString("Listing name"),
  entry_direction: z.nativeEnum(Direction),
  exit_direction: z.nativeEnum(Direction),
  view: requiredString("View"),

  project_type: z.nativeEnum(ProjectType),
  unit_type: z.nativeEnum(HomeUnitType),
  property_sub_type: requiredString("Property sub type"),

  area_unit_type: z.nativeEnum(AreaUnitType).optional().nullable(),
  plot_area_unit_type: z.nativeEnum(PlotAreaUnitType),
  plot_area: optionalString,

  property_status: z.nativeEnum(PropertyStatus),
  possession_timeline: z.nativeEnum(PossessionTimeline),
  completion_date: z.coerce.date(),

  passenger_lifts: nonNegativeNumber,
  service_lifts: nonNegativeNumber,
  total_floor: optionalString,

  flooring: objectIdSchema,
  bhk: objectIdSchema,

  no_of_balconies: requiredString("Number of balconies"),
  no_of_bathrooms: requiredString("Number of bathrooms"),
  no_of_lifts: requiredString("Number of lifts"),
  no_of_parkings: requiredString("Number of parkings"),
  parking_details: z.string().default("")
});

// Commercial Details Sub-schema
export const commercialDetailsSchema = z.object({
  property_purpose: z.nativeEnum(PropertyPurpose),
  availability_status: objectIdSchema,
  available_from: z.coerce.date().optional().nullable(),
  current_occupation_status: z.nativeEnum(CurrentOccupancy),

  visit_day: z.nativeEnum(VisitDay),
  particular_day: z.nativeEnum(Day).nullable().default(null),
  start_time: requiredString("Start time"),
  end_time: requiredString("End time"),

  parking_type: objectIdSchema,

  monthly_rent: nonNegativeNumber,
  discount_price: nonNegativeNumber,
  security_amount: nonNegativeNumber,
  property_price: z.coerce.number().min(0),
  sale_considration: z.coerce.number().min(0),
  sale_consideration: z.coerce.number().min(0),
  avg_rate_per_sqft: z.coerce.number().min(0),

  brokerage_charge: nonNegativeNumber,
  furnishing: objectIdSchema,
  tenantsPreferred: objectIdSchema,

  transfer_charges: nonNegativeNumber,
  move_in_charges: nonNegativeNumber,
  registration_charges: nonNegativeNumber,
  stamp_duty: nonNegativeNumber,

  pets_allowed: z.nativeEnum(PetsAllowed),
  brokerage_terms: z.nativeEnum(BrokerageTerms),

  ceiling_height: z.string().default("0"),
  ceiling_height_side: z.string().default("0"),
  maintain_charges: nonNegativeNumber,
  maintenance_included: z.string().default(""),

  notice_needed: z.nativeEnum(NoticeNeededDuration),
  vastu_compliant: z.nativeEnum(VastuCompliant),
  cross_ventilation: z.nativeEnum(CrossVentilation),
  natural_light: z.nativeEnum(NaturalLight),

  boundary_wall_type: z.string().default(""),
  boundary_wall_height: z.string().default("0"),
  boundary_wall_height_side: z.string().default("0"),
  gate_type: z.string().default(""),
  gate_height: z.string().default("0"),
  gate_height_side: z.string().default("0"),
  servant_quarters: z.string().default(""),
  lawn_area: z.string().default(""),
  internal_notes: z.string().default(""),
  availablility_status: objectIdSchema
});

export const brokerAndAgentSchema = z.object({
  broker_id: objectIdSchema,
  firm_id: objectIdSchema
});

export const listingPropertyDetailsSchema = z.object({
  unit_no: requiredString("Unit number"),
  project_name: requiredString("Project name"),
  tower: requiredString("Tower")
});

export const listingAddressSchema = z.object({
  line_1: z.string().default(""),
  region: requiredString("Region"),
  sub_region: requiredString("Sub region"),
  subregion: requiredString("Subregion"),
  locality: requiredString("Locality"),
  city: requiredString("City"),
  listing_city: requiredString("Listing city"),
  pincode: z.coerce.number()
});

// Partial Schemas
export const listingDetailsPartialSchema = listingDetailsSchema.partial();
export const commercialDetailsPartialSchema = commercialDetailsSchema.partial();
export const propertyDetailsPartialSchema = listingPropertyDetailsSchema.partial();
export const listingAddressPartialSchema = listingAddressSchema.partial();

export const updateListingDetailsSchema = z.object({
  listing_details: listingDetailsPartialSchema.optional(),
  commercial_details: commercialDetailsPartialSchema.optional(),
  property_details: propertyDetailsPartialSchema.optional(),
  listing_address: listingAddressPartialSchema.optional(),
  broker_and_agent: brokerAndAgentSchema.partial().optional()
});

// Root Listing Schema
export const rootListingSchema = z.object({
  listing_type: z.nativeEnum(ListingType),
  listing_details: listingDetailsSchema,
  commercial_details: commercialDetailsSchema,

  lastUpdate: z.any(),
  people_associated: z.record(z.string(), z.any()).default({}),
  broker_and_agent: brokerAndAgentSchema,
  buildstone: z.record(z.string(), z.any()).default({}),

  key_features: z.array(z.string()).default([]),
  amenities: z.array(z.any()).default([]),
  furnishingAmenities: z.array(z.any()).default([]),
  apartmentAmenities: z.array(z.string()).default([]),

  status: z.array(statusHistorySchema).default([]),

  onboarding_type: z.string().default("normal"),
  isCustomUnit: z.boolean().default(false),
  is_custom_unit: z.boolean().default(false),
  selected_unit_id: objectIdSchema,
  selected_unit_no: requiredString("Selected unit number"),

  property_details: listingPropertyDetailsSchema,
  listing_address: listingAddressSchema,

  coverImageKey: z.string().default(""),
  firm_name: requiredString("Firm name"),
  broker_name: requiredString("Broker name"),
  video: z.any().nullable().default(null),
  vrTour: z.string().default(""),
  is_personalized: z.boolean().default(false),
  seo: z.record(z.string(), z.any()).default({}),
  live: z.boolean().default(true),

  listing_id: listingIdSchema
});

// Request Route Schemas
export const createListingInitSchema = z.object({
  body: z.object({
    listing_type: z.nativeEnum(ListingType),
    _id: objectIdSchema.optional()
  })
});

export const createListingSchema = createListingInitSchema.shape.body;

const listingIdParamSchema = z.object({
  id: objectIdSchema
});

export const updateListingSchema = z.object({
  params: listingIdParamSchema,
  body: updateListingDetailsSchema
});

export const submitListingSchema = z.object({
  params: listingIdParamSchema
});

export const updateStepSchema = z.object({
  params: listingIdParamSchema,
  body: z.object({
    current_step: z.nativeEnum(OnboardingStep)
  })
});

export const listingActionSchema = z.object({
  params: listingIdParamSchema,
  body: z.object({
    action: requiredString("action"),
    remark: z.string().trim().optional()
  })
});

// Exported Types
export type UpdateListingInput = z.infer<typeof updateListingSchema>["body"];
export type CreateListingInitInput = z.infer<typeof createListingInitSchema>["body"];
export type UpdateListingDetailsInput = z.infer<typeof updateListingDetailsSchema>;
export type ListingActionInput = z.infer<typeof listingActionSchema>["body"];
