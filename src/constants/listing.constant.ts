export enum ListingType {
  HOME = "home",
  OFFICE = "office",
  INDUSTRIAL = "industrial",
  RETAIL = "retail",
  LAND = "land",
}
// listing sub types...
export enum HomeUnitType {
  STUDIO = "Studio",
  APARTMENT = "Apartment",
  DUPLEX = "Duplex",
  PENTHOUSE = "Penthouse",
  JODI = "Jodi",
  INDEPENDENT_FLOOR = "Independent Floor",
  INDEPENDENT_HOUSE = "Independent House",
  VILLA = "Villa",
  HOLIDAY_HOME = "Holiday Home",
  ROW_TOWN_HOUSE = "Row/Town House",
}
export enum OfficeUnitType {
    INDEPENDENT_HOUSE = "Independent House",
    INDEPENDENT_BUILDING = "Independent Building",
}
export enum IndustrialUnitType {
    WAREHOUSE = "Warehouse",
    DARKSTORE = "Darkstore",
    SHED = "Shed",
    GODOWN = "Godown",
    IN_BUILDING = "Inbuilding",
}
export enum RetailUnitType{
    SHOP = "Shop",
    SHOWROOM = "Showroom",
}
export enum LandUnitType{
    RESIDENTIAL_PLOT = "Residential Plot",
    COMMERCIAL_LAND = "Commercial Land",
    AGRICULTURE_LAND = "Agriculture Land",
    INDUSTRIAL_LAND = "Industrial Land",
    FARM_HOUSE = "Farm House",
}
// listing status
export enum ListingStatus{
    WORK_IN_PROGRESS = "Work In Progress",
    PENDING = "Pending",
    APPROVED = "Approved",
    REJECTED = "Rejected",
    DELISTED = "Delisted",
    RELISTED = "Relisted",
    DELETED = "Deleted",
}
export enum OnboardingStep {
    ESSENTIAL = "Essential",
    DETAILS = "Details",
    KEY_FEATURES = "Key features",
    IMAGES = "Images",
    VIDEOS = "Videos",
    AMENITIES = "Amenities"
}