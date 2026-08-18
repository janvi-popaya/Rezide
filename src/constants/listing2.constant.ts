export enum Direction{
  NORTH = "N",
  SOUTH = "S",
  EAST = "E",
  WEST = "W",
  NORTH_EAST = "NE",
  NORTH_WEST = "NW",
  SOUTH_EAST = "SE",
  SOUTH_WEST = "SW",
  NA = "NA",
}
export enum AreaUnitType {
  SQFT = "sqft",
  SQM = "sqm",
}
export enum CrossVentilation {
  YES = "Yes",
  NO = "No",
}
export enum NaturalLight {
  YES = "Yes",
  NO = "No",
}
export enum VastuCompliant {
  YES = "Yes",
  NO = "No",
}
export enum PetsAllowed {
  YES = "yes",
  NO = "no",
}
export enum FurnishingType{
  BARE_SHELL = "Bare Shell",
  BUILDER_CONDITION = "Builder Condition",
  UNFURNISHED = "Unfurnished",
  SEMI_FURNISHED = "Semi Furnished",
  FULL_FURNISHED = "Fully Furnished",
}
export enum ParkingType {
  COVERED = "Covered",
  OPEN = "Open",
  LIFT = "Lift",
  NOT_DEFINED = "Not Defined",
  STACK = "Stack",
  TANDEM = "Tandem",
}
export enum VisitDay {
  EVERYDAY = "Everyday",
  WEEKDAY = "Weekday",
  WEEKEND = "Weekend",
  PARTICULAR_DAY = "Particular Day",
}
export enum Day {
  SUNDAY = "Sunday",
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
}
export enum BrokerageTerms{
  SIDE_BY_SIDE = "Side By Side",
  PLUS_ONE = "Plus 1",
  DISCUSS = "Discuss",
}
export enum NoticeNeededDuration{
  NONE = "None",
  ONE_HOUR = "1 Hour",
  TWO_HOURS = "2 Hours",
  SAME_DAY = "Same Day",
  ONE_DAY = "1 Day",
}
export enum CurrentOccupancy{
  OWNER_OCCUPIED = "Owner Occupied",
  TENANT_OCCUPIED = "Tenant Occupied",
  VACANT_WITH_KEYS = "Vacant With Keys",
  VACANT_WITHOUT_KEYS = "Vacant Without Keys",
  UNDER_CONSTRUCTION = "Under Construction",
}
export enum AreaType{
  USABLE_CARPET = "Usable Carpet",
  RERA_CARPET = "Rera Carpet",
  MOFA_CARPET = "Mofa Carpet",
  BUILT_UP = "Built Up",
  TOTAL_SELLABLE = "Total Sellable"
}