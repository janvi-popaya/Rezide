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
  YES = "yes",
  NO = "no",
}
export enum NaturalLight {
  YES = "yes",
  NO = "no",
}
export enum VastuCompliant {
  YES = "yes",
  NO = "no",
}
export enum PetsAllowed {
  YES = "yes",
  NO = "no",
}
export enum FurnishingType{
  BARE_SHELL = "bare_shell",
  BUILDER_CONDITION = "builder_condition",
  UNFURNISHED = "unfurnished",
  SEMI_FURNISHED = "semi_furnished",
  FULL_FURNISHED = "fully_furnished",
}
export enum ParkingType {
  COVERED = "covered",
  OPEN = "open",
  LIFT = "lift",
  NOT_DEFINED = "not_defined",
  STACK = "stack",
  TANDEM = "tandem",
}
export enum VisitDay {
  EVERYDAY = "everyday",
  WEEKDAY = "weekday",
  WEEKEND = "weekend",
  PARTICULAR_DAY = "particular_day",
}
export enum Day {
  SUNDAY = "sunday",
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
}
export enum BrokerageTerms{
  SIDE_BY_SIDE = "side_by_side",
  PLUS_ONE = "plus_1",
  DISCUSS = "discuss",
}
export enum NoticeNeededDuration{
  NONE = "none",
  ONE_HOUR = "1_hour",
  TWO_HOURS = "2_hours",
  SAME_DAY = "same_day",
  ONE_DAY = "1_day",
}
export enum CurrentOccupancy{
  OWNER_OCCUPIED = "owner_occupied",
  TENANT_OCCUPIED = "tenant_occupied",
  VACANT_WITH_KEYS = "vacant_with_keys",
  VACANT_WITHOUT_KEYS = "vacant_without_keys",
  UNDER_CONSTRUCTION = "under_construction",
}
export enum AreaType{
  USABLE_CARPET = "usable_carpet",
  RERA_CARPET = "rera_carpet",
  MOFA_CARPET = "mofa_carpet",
  BUILT_UP = "built_up",
  TOTAL_SELLABLE = "total_sellable"
}