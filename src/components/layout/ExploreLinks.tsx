import {
  CalendarHeart,
  Compass,
  Heart,
  Images,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export type ExploreLink = {
  label: string;
  to: string;
  icon: LucideIcon;
};

export const exploreLinks: ExploreLink[] = [
  { label: "Explore Overview", to: "/explore", icon: Compass },
  { label: "Experiences", to: "/explore#experiences", icon: Compass },
  {
    label: "Events & Celebrations",
    to: "/explore#events",
    icon: CalendarHeart,
  },
  { label: "Weddings", to: "/explore#weddings", icon: Heart },
  { label: "Nearby Attractions", to: "/explore#attractions", icon: MapPin },
  { label: "Photo Gallery", to: "/explore#gallery", icon: Images },
];
