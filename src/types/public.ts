export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ResortLocation {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  featured_image?: string | null;
  is_featured?: boolean;
}

export interface RoomImage {
  id?: number;
  url?: string | null;
  image_url?: string | null;
  path?: string | null;
}

export interface RoomType {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  max_adults: number;
  max_children: number;
  max_occupancy: number;
  images?: RoomImage[];
  property?: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface AvailabilityPayload {
  location_id: number;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
}

export interface AvailableRoom {
  room_type_id: number;
  name: string;
  slug: string;
  available_units: number;
  pricing: {
    nights: number;
    subtotal: string;
    total: string;
  };
  location: {
    id: number;
    name: string;
    slug: string;
  };
  property: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface AvailabilityResult {
  search: AvailabilityPayload & {
    nights: number;
  };
  results: AvailableRoom[];
  total_room_types: number;
}
