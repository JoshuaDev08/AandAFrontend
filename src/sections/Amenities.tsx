import { motion, useReducedMotion } from "motion/react";

import {
  Wifi,
  Leaf,
  BedDouble,
  CarFront,
  UsersRound,
  CalendarHeart,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

type Amenity = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

const amenities: Amenity[] = [
  {
    id: "wifi",
    label: "Free Wi-Fi",
    description: "Stay connected",
    icon: Wifi,
  },
  {
    id: "garden",
    label: "Garden Areas",
    description: "Nature-filled spaces",
    icon: Leaf,
  },
  {
    id: "rooms",
    label: "Air-conditioned Rooms",
    description: "Relax in comfort",
    icon: BedDouble,
  },
  {
    id: "parking",
    label: "On-site Parking",
    description: "Convenient arrivals",
    icon: CarFront,
  },
  {
    id: "family",
    label: "Family Friendly",
    description: "Time together",
    icon: UsersRound,
  },
  {
    id: "events",
    label: "Event Spaces",
    description: "Celebrate together",
    icon: CalendarHeart,
  },
];

export default function Amenities() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: 0.7,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      id="amenities"
      aria-labelledby="amenities-heading"
      className="
        relative overflow-hidden
        bg-base-200
        px-6 py-20
        sm:px-10 sm:py-24
        lg:px-[6vw] lg:py-32
      "
    >
      <div className="mx-auto max-w-[1600px]">
        {/* SECTION HEADING */}
        <motion.div
          {...reveal()}
          className="
            mb-12 flex flex-col
            justify-between gap-6
            lg:flex-row lg:items-end
          "
        >
          <div>
            {/* EYEBROW */}
            <p
              className="
                mb-5 text-[10px] font-semibold
                uppercase tracking-[0.2em]
                text-primary
              "
            >
              The Thoughtful Details
            </p>

            {/* TITLE */}
            <h2
              id="amenities-heading"
              className="
                font-serif font-normal
                text-[clamp(42px,5vw,76px)]
                leading-[1.08]
                tracking-[-0.035em]
                text-primary
              "
            >
              Everything for an
              <br />
              <em className="font-normal italic">easy stay</em>
            </h2>
          </div>

          {/* DESCRIPTION */}
          <p
            className="
              max-w-[410px]
              text-[14px] leading-8
              text-base-content/65
              lg:mb-2
            "
          >
            Simple comforts and generous spaces, thoughtfully brought together
            to make every visit feel effortless.
          </p>
        </motion.div>

        {/* AMENITIES GRID */}
        <div
          className="
            grid grid-cols-2
            border-t border-l
            border-primary/15
            sm:grid-cols-3
            xl:grid-cols-6
          "
        >
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;

            return (
              <motion.div
                key={amenity.id}
                initial={reduceMotion ? false : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : index * 0.075,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  group relative
                  flex min-h-[190px]
                  flex-col items-start
                  justify-between
                  border-r border-b
                  border-primary/15
                  p-5
                  transition-colors duration-500
                  hover:bg-base-100/70
                  sm:min-h-[215px]
                  sm:p-7
                  xl:min-h-[235px]
                "
              >
                {/* ICON */}
                <div
                  className="
                    flex h-12 w-12
                    items-center justify-center
                    border border-primary/15
                    text-primary
                    transition-all duration-500
                    group-hover:border-primary
                    group-hover:bg-primary
                    group-hover:text-primary-content
                  "
                >
                  <Icon
                    size={25}
                    strokeWidth={1.35}
                    className="
                      transition-transform duration-500
                      group-hover:scale-110
                    "
                  />
                </div>

                {/* LABEL + DESCRIPTION */}
                <div className="mt-8">
                  <h3
                    className="
                      mb-2 font-serif
                      text-[clamp(17px,1.5vw,21px)]
                      font-normal leading-snug
                      text-primary
                    "
                  >
                    {amenity.label}
                  </h3>

                  <p
                    className="
                      text-[10px] leading-5
                      tracking-[0.02em]
                      text-base-content/55
                    "
                  >
                    {amenity.description}
                  </p>
                </div>

                {/* DECORATIVE CORNER ARROW */}
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.3}
                  aria-hidden="true"
                  className="
                    absolute right-5 top-5
                    text-primary/25
                    opacity-0
                    transition-all duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  "
                />

                {/* GOLD HOVER LINE */}
                <div
                  aria-hidden="true"
                  className="
                    absolute inset-x-0 bottom-0
                    h-[2px] origin-left scale-x-0
                    bg-accent
                    transition-transform duration-500
                    group-hover:scale-x-100
                  "
                />
              </motion.div>
            );
          })}
        </div>

        {/* VERIFICATION NOTE */}
        <motion.p
          {...reveal(0.1)}
          className="
            mt-6 text-[11px]
            leading-6 text-base-content/55
          "
        >
          Amenities may vary by resort location and accommodation type. Please
          check the individual property details when planning your stay.
        </motion.p>
      </div>
    </section>
  );
}
