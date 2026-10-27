import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  CalendarHeart,
  Heart,
  Users,
  BriefcaseBusiness,
  Cake,
  Flower2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type EventType = {
  name: string;
  description: string;
  icon: LucideIcon;
};

const eventTypes: EventType[] = [
  {
    name: "Garden Weddings",
    description: "Intimate ceremonies",
    icon: Heart,
  },
  {
    name: "Private Birthdays",
    description: "Personal milestones",
    icon: Cake,
  },
  {
    name: "Orchard Retreats",
    description: "Nature-inspired gatherings",
    icon: Flower2,
  },
  {
    name: "Family Reunions",
    description: "Moments together",
    icon: Users,
  },
  {
    name: "Corporate Events",
    description: "Team celebrations",
    icon: BriefcaseBusiness,
  },
  {
    name: "Private Celebrations",
    description: "Special occasions",
    icon: Sparkles,
  },
];

// Replace with the wedding image from your Figma design.
const EVENT_IMAGE = "/images/events/garden-wedding.webp";

export default function Events() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: 0.75,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="
        relative grid
        grid-cols-1
        overflow-hidden
        bg-primary
        text-primary-content
        lg:grid-cols-[1.05fr_0.95fr]
      "
    >
      {/* LEFT: EVENT PHOTOGRAPHY */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: -35 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          group relative
          min-h-[370px]
          overflow-hidden
          sm:min-h-[480px]
          lg:min-h-full
        "
      >
        {/* IMAGE */}
        <img
          src={EVENT_IMAGE}
          alt="Outdoor garden wedding ceremony at a resort"
          loading="lazy"
          decoding="async"
          className="
            absolute inset-0
            h-full w-full
            object-cover object-center
            transition-transform duration-[1200ms]
            ease-out
            group-hover:scale-[1.045]
          "
        />

        {/* IMAGE OVERLAY */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            bg-gradient-to-t
            from-[#071D16]/40
            via-transparent
            to-transparent
          "
        />

        {/* EDITORIAL PHOTO LABEL */}
        <div
          className="
            absolute bottom-6 left-6
            flex items-center gap-3
            text-[10px] font-medium
            uppercase tracking-[0.16em]
            text-white/90
            sm:bottom-10 sm:left-10
          "
        >
          <span className="h-px w-9 bg-accent" />
          A&A Garden Suites
        </div>
      </motion.div>

      {/* RIGHT: EVENTS CONTENT */}
      <div
        className="
          relative flex flex-col
          justify-center
          px-6 py-16
          sm:px-10 sm:py-20
          lg:px-[7vw] lg:py-24
          xl:min-h-[790px]
        "
      >
        {/* SUBTLE DECORATIVE CIRCLE */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-44 -top-44
            h-[400px] w-[400px]
            rounded-full
            border border-white/10
          "
        />

        {/* EYEBROW */}
        <motion.div {...reveal(0)} className="mb-6 flex items-center gap-4">
          <CalendarHeart size={17} strokeWidth={1.4} className="text-accent" />

          <p
            className="
              m-0 text-[10px] font-semibold
              uppercase tracking-[0.2em]
              text-white/75
            "
          >
            Events Across Our Locations
          </p>
        </motion.div>

        {/* HEADING */}
        <motion.h2
          id="events-heading"
          {...reveal(0.12)}
          className="
            mb-7 font-serif
            font-normal
            text-[clamp(44px,4.6vw,76px)]
            leading-[1.08]
            tracking-[-0.035em]
          "
        >
          Celebrate somewhere
          <br />
          <em className="font-normal italic text-[#E7DDC8]">
            worth remembering.
          </em>
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          {...reveal(0.22)}
          className="
            mb-8 max-w-[560px]
            text-[14px] leading-[1.9]
            text-white/75
            sm:text-[15px]
          "
        >
          From intimate “I do's” to milestone birthdays and joyful reunions,
          discover a setting for the moments that matter most.
        </motion.p>

        {/* EVENT TYPES */}
        <motion.div
          {...reveal(0.32)}
          className="
            mb-10 grid grid-cols-2
            gap-x-5
            sm:gap-x-10
          "
        >
          {eventTypes.map((event) => {
            const Icon = event.icon;

            return (
              <div
                key={event.name}
                className="
                  group border-b
                  border-white/15
                  py-4
                  transition-colors duration-300
                  hover:border-accent/60
                "
              >
                <div className="mb-2 flex items-center gap-2.5">
                  <Icon
                    size={16}
                    strokeWidth={1.4}
                    className="
                      shrink-0 text-accent
                      transition-transform duration-300
                      group-hover:scale-110
                    "
                  />

                  <span
                    className="
                      font-serif text-[15px]
                      font-normal
                      leading-snug
                      sm:text-[17px]
                    "
                  >
                    {event.name}
                  </span>
                </div>

                <small
                  className="
                    block pl-[26px]
                    text-[9px] uppercase
                    tracking-[0.1em]
                    text-white/50
                  "
                >
                  {event.description}
                </small>
              </div>
            );
          })}
        </motion.div>

        {/* ACTIONS */}
        <motion.div
          {...reveal(0.42)}
          className="
            flex flex-wrap
            items-center gap-6
            sm:gap-8
          "
        >
          <Link
            to="/explore#events"
            className="
              group inline-flex min-h-[54px]
              items-center justify-center gap-6
              border border-white
              bg-white px-6
              text-[10px] font-semibold
              uppercase tracking-[0.13em]
              text-primary
              transition-colors duration-300
              hover:bg-[#E8DFD1]
            "
          >
            Explore Celebrations
            <ArrowUpRight
              size={17}
              strokeWidth={1.5}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </Link>

          <Link
            to="/contact?subject=event-inquiry"
            className="
              group inline-flex
              items-center gap-3
              border-b border-white/60
              pb-2
              text-[10px] font-semibold
              uppercase tracking-[0.12em]
              text-white
              transition-colors duration-300
              hover:border-accent
            "
          >
            Request a Proposal
            <ArrowUpRight
              size={17}
              strokeWidth={1.5}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
