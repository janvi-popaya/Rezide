import { Schema, model } from "mongoose";
import {
  ListingType, ListingStatus, HomeUnitType, UnitFloorPosition,
  ProjectType, PlotAreaUnitType, PropertyStatus, PossessionTimeline,
  PropertyPurpose, Direction, AreaUnitType, PetsAllowed, VisitDay, Day,
  BrokerageTerms, NoticeNeededDuration, CurrentOccupancy, AreaType,
  VastuCompliant, CrossVentilation, NaturalLight, OnboardingStep
} from "../constants/index.constant.js";

// Helper for Schema options
const noIdOption = { _id: false };

// Status History
const StatusHistorySchema = new Schema(
  {
    code: { type: String, enum: Object.values(ListingStatus) },
    remark: { type: String, default: "" },
    updated_by: { name: String, user_id: { type: Schema.Types.ObjectId } },
    timestamp: { type: Schema.Types.Mixed }
  },
  { _id: true }
);

// Listing Details
const ListingDetailsSchema = new Schema(
  {
    listing_status: { type: String, enum: Object.values(ListingStatus) },
    listing_location: String,
    region: String,
    sub_region: String,
    subregion: String,
    locality: String,
    listing_city: String,

    project: { type: Schema.Types.ObjectId },
    tower: { type: Schema.Types.ObjectId },
    unit_no: { type: Schema.Types.ObjectId },
    floor_no: String,
    combine_unit_no: [{ type: Schema.Types.ObjectId }],
    UnitFloorPosition: { type: String, enum: Object.values(UnitFloorPosition) },

    towerHide: { type: Boolean, default: false },
    projectHide: { type: Boolean, default: false },
    unitHide: { type: Boolean, default: false },
    floorHide: { type: Boolean, default: false },
    priceHide: { type: Boolean, default: false },

    isCustomUnit: { type: Boolean, default: false },
    is_custom_unit: { type: Boolean, default: false },
    selected_unit_id: { type: Schema.Types.ObjectId },
    selected_unit_no: String,
    share: { type: Boolean, default: true },

    building_status: String,
    building_age: Number,
    area: Number,
    area_type: { type: String, enum: Object.values(AreaType) },

    listing_name: String,
    entry_direction: { type: String, enum: Object.values(Direction) },
    exit_direction: { type: String, enum: Object.values(Direction) },
    view: String,

    project_type: { type: String, enum: Object.values(ProjectType) },
    unit_type: { type: String, enum: Object.values(HomeUnitType) },
    property_sub_type: String,

    area_unit_type: { type: String, enum: Object.values(AreaUnitType) },
    plot_area_unit_type: { type: String, enum: Object.values(PlotAreaUnitType) },
    plot_area: String,

    property_status: { type: String, enum: Object.values(PropertyStatus) },
    possession_timeline: { type: String, enum: Object.values(PossessionTimeline) },
    completion_date: Date,

    passenger_lifts: Number,
    service_lifts: Number,
    total_floor: String,

    flooring: { type: Schema.Types.ObjectId },
    bhk: { type: Schema.Types.ObjectId },

    no_of_balconies: String,
    no_of_bathrooms: String,
    no_of_lifts: String,
    no_of_parkings: String,
    parking_details: { type: String, default: "" }
  },
  noIdOption
);

// Commercial Details
const CommercialDetailsSchema = new Schema(
  {
    property_purpose: { type: String, enum: Object.values(PropertyPurpose) },
    availability_status: { type: Schema.Types.ObjectId },
    available_from: Date,
    current_occupation_status: { type: String, enum: Object.values(CurrentOccupancy) },

    visit_day: { type: String, enum: Object.values(VisitDay) },
    particular_day: { type: String, enum: Object.values(Day), default: null },
    start_time: String,
    end_time: String,

    parking_type: { type: Schema.Types.ObjectId },

    monthly_rent: { type: Number, default: 0 },
    discount_price: { type: Number, default: 0 },
    security_amount: { type: Number, default: 0 },
    property_price: Number,
    sale_considration: Number,
    sale_consideration: Number,
    avg_rate_per_sqft: Number,

    brokerage_charge: { type: Number, default: 0 },
    furnishing: { type: Schema.Types.ObjectId },
    tenantsPreferred: { type: Schema.Types.ObjectId },

    transfer_charges: { type: Number, default: 0 },
    move_in_charges: { type: Number, default: 0 },
    registration_charges: { type: Number, default: 0 },
    stamp_duty: { type: Number, default: 0 },

    pets_allowed: { type: String, enum: Object.values(PetsAllowed) },
    brokerage_terms: { type: String, enum: Object.values(BrokerageTerms) },

    ceiling_height: { type: String, default: "0" },
    ceiling_height_side: { type: String, default: "0" },

    maintain_charges: { type: Number, default: 0 },
    maintenance_included: { type: String, default: "" },

    notice_needed: { type: String, enum: Object.values(NoticeNeededDuration), default: "" },
    vastu_compliant: { type: String, enum: Object.values(VastuCompliant), default: "" },
    cross_ventilation: { type: String, enum: Object.values(CrossVentilation), default: "" },
    natural_light: { type: String, enum: Object.values(NaturalLight), default: "" },

    boundary_wall_type: { type: String, default: "" },
    boundary_wall_height: { type: String, default: "" },
    boundary_wall_height_side: { type: String, default: "" },

    gate_type: { type: String, default: "" },
    gate_height: { type: String, default: "" },
    gate_height_side: { type: String, default: "" },

    servant_quarters: { type: String, default: "" },
    lawn_area: { type: String, default: "" },
    internal_notes: { type: String, default: "" },

    availablility_status: { type: Schema.Types.ObjectId }
  },
  noIdOption
);

// Broker & Agent
const BrokerAndAgentSchema = new Schema(
  {
    broker_id: { type: Schema.Types.ObjectId },
    firm_id: { type: Schema.Types.ObjectId }
  },
  noIdOption
);

// Property Details
const ListingPropertyDetailsSchema = new Schema(
  {
    unit_no: String,
    project_name: String,
    tower: String
  },
  noIdOption
);

// Listing Address
const ListingAddressSchema = new Schema(
  {
    line_1: { type: String, default: "" },
    region: String,
    sub_region: String,
    subregion: String,
    locality: String,
    city: String,
    listing_city: String,
    pincode: Number
  },
  noIdOption
);

// Main Listing Schema
const listingOnboardingSchema = new Schema(
  {
    // User / Tenant Identification
    sub: { type: String, required: true, index: true },
    firm_id: { type: Schema.Types.ObjectId, required: true, index: true },

    // Onboarding Step
    current_step: {
      type: String,
      enum: Object.values(OnboardingStep),
      default: OnboardingStep.ESSENTIAL,
      required: true
    },

    // Listing Basic Information
    listing_type: { type: String, enum: Object.values(ListingType) },
    listing_details: { type: ListingDetailsSchema },
    commercial_details: { type: CommercialDetailsSchema },

    // Other Information
    lastUpdate: { type: Schema.Types.Mixed },
    people_associated: { type: Schema.Types.Mixed, default: {} },
    broker_and_agent: { type: BrokerAndAgentSchema },
    buildstone: { type: Schema.Types.Mixed, default: {} },

    // Features
    key_features: { type: [String], default: [] },
    amenities: { type: [Schema.Types.Mixed], default: [] },
    furnishingAmenities: { type: [Schema.Types.Mixed], default: [] },
    apartmentAmenities: { type: [String], default: [] },

    // Status History
    status: { type: [StatusHistorySchema], default: [] },

    // Onboarding Flags
    onboarding_type: { type: String, default: "normal" },
    isCustomUnit: { type: Boolean, default: false },
    is_custom_unit: { type: Boolean, default: false },
    selected_unit_id: { type: Schema.Types.ObjectId },
    selected_unit_no: String,

    // Property & Address
    property_details: { type: ListingPropertyDetailsSchema },
    listing_address: { type: ListingAddressSchema },

    // Media
    coverImageKey: { type: String, default: "" },
    video: { type: Schema.Types.Mixed, default: null },
    vrTour: { type: String, default: "" },

    // Broker / Firm Information
    firm_name: String,
    broker_name: String,

    // SEO / Personalization
    is_personalized: { type: Boolean, default: false },
    seo: { type: Schema.Types.Mixed, default: {} },
    live: { type: Boolean, default: true },

    // Custom Listing ID
    listing_id: { type: String, required: true, unique: true, index: true }
  },
  { timestamps: true }
);

// Compound Indexes
listingOnboardingSchema.index({ sub: 1, firm_id: 1 });
listingOnboardingSchema.index({ sub: 1, current_step: 1 });

export default model("Listings", listingOnboardingSchema);