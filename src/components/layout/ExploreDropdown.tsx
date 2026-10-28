import { useState } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  Compass,
  CalendarHeart,
  Heart,
  MapPin,
  Images,
} from "lucide-react";

const exploreLinks = [
  { label: "Overview", to: "/explore", icon: Compass },
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

type Props = {
  scrolled: boolean;
};

export default function ExploreDropdown({ scrolled }: Props) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isExplore = location.pathname === "/explore";

  const textColor = scrolled ? "text-primary" : "text-white";

  return (
    <div
      className="group relative flex h-full items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      }}
    >
      {/* EXPLORE LINK */}
      <div className="flex items-center gap-1.5">
        <Link
          to="/explore"
          onClick={() => setOpen(false)}
          aria-current={isExplore ? "page" : undefined}
          className={`
            relative py-3 text-[11px]
            font-medium uppercase tracking-[0.12em]
            transition-colors duration-300
            ${textColor}
            ${isExplore ? "opacity-100" : "opacity-80 hover:opacity-100"}
          `}
        >
          Explore
        </Link>

        <button
          type="button"
          aria-label="Toggle Explore menu"
          aria-expanded={open}
          aria-controls="explore-dropdown-menu"
          onClick={() => setOpen((value) => !value)}
          className={`flex h-8 w-6 items-center justify-center ${textColor}`}
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="explore-dropdown-menu"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="
              absolute left-1/2 top-full z-50
              w-[270px] -translate-x-1/2
              border border-primary/10
              bg-base-100/95 p-2
              shadow-[0_20px_55px_rgba(10,35,25,0.18)]
              backdrop-blur-xl
            "
          >
            {exploreLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="
                    group/item flex items-center
                    gap-3 px-4 py-3
                    text-primary
                    transition-colors duration-200
                    hover:bg-base-200
                    focus-visible:bg-base-200
                  "
                >
                  <Icon
                    size={17}
                    strokeWidth={1.5}
                    className="text-primary/65"
                  />

                  <span className="text-[11px] font-medium tracking-[0.03em]">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
