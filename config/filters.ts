export type Filters = typeof filters

export const filters = {
  default: {
    radius: "radius",
    defaultDeliveryMethod: "local_pick_up",
    deliveryMethod: {
      local_pick_up: "Local Pickup",
      shipping: "Shipping"
    },
    defaultSortBy: "best_match",
    sortBy: {
      best_match: "Suggested",
      distance_ascend: "Distance: Nearest first",
      creation_time_descend: "Date Listed: Newest first",
      price_ascend: "Price: Lowest first",
      price_descend: "Price: Highest first",
    },
    minPrice: "minPrice",
    maxPrice: "maxPrice",
    topLevelVehicleType: {
      blank: "All",
      car_truck: "Cars & Trucks",
      motorcycle: "Motorcycles",
      powersport: "Powersports",
      rv_camper: "RVs & Campers",
      boat: "Boats",
      commercial: "Commercial & Industrial",
      trailer: "Trailers",
      other: "Other",
    },
    itemCondition: {
      new: "New",
      used_like_new: "Used Like New",
      used_good: "Used Good",
      used_fair: "Used Fair",
    },
    defaultAvailability: "in stock",
    availability: {
      "in stock": "Available",
      "out of stock": "Sold"
    },
    defaultDaysSinceListed: "0",
    daysSinceListed: {
      "0": "All",
      "1": "Last 24 hours",
      "7": "Last 7 days",
      "30": "Last 30 days",
    }
  },
  cars: {
    defaultSortBy: "best_match",
    sortBy: {
      best_match: "Suggested",
      price_ascend: "Price: Lowest first",
      price_descend: "Price: Highest first",
      distance_ascend: "Distance: Nearest first",
      distance_descend: "Distance: Farthest first",
      vehicle_mileage_ascend: "Mileage: Lowest first",
      vehicle_mileage_descend: "Mileage: Highest first",
      vehicle_year_descend: "Year: Newest first",
      vehicle_year_ascend: "Year: Oldest first",
    },
    minPrice: "minPrice",
    maxPrice: "maxPrice",
    itemCondition: {
      new: "New",
      used_like_new: "Used Like New",
      used_good: "Used Good",
      used_fair: "Used Fair",
    },
    defaultAvailability: "in stock",
    availability: {
      "in stock": "Available",
      "out of stock": "Sold"
    },
    defaultDaysSinceListed: "0",
    daysSinceListed: {
      "0": "All",
      "1": "Last 24 hours",
      "7": "Last 7 days",
      "30": "Last 30 days",
    }
  },
}
