
export interface CountriesDetails {
  name: string;
  icon: string;
  locale: string;
  cities: string[];
  cities_fb: string[];
  coverage: string;
}
export interface Countries {
  [key: string]: CountriesDetails
}
export interface FilterSortBy {
  [key: string]: string
}
export interface FilterItemCondition {
  [key: string]: string
}
export interface FilterAvailability {
  [key: string]: string
}
export interface FilterDeliveryMethod {
  [key: string]: string
}
export interface FilterDaysSinceListed {
  [key: string]: string
}
