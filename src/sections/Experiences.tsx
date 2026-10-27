import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";

type Experience = {
  id: number;
  name: string;
  image: string;
  description: string;
  location: string;
  slug: string;
};

const experiences: Experience[] = [
  {
    id: 1,
    name: "Garden Escape",
    image: "/images/experiences/garden.webp",
    description: "Breathe deeper among lush pathways and quiet corners.",
    location: "Tagaytay Gardens",
    slug: "garden-escape",
  },
  {
    id: 2,
    name: "Couple's Retreat",
    image: "/images/experiences/couples.webp",
    description: "Unhurried mornings, private spaces and time together.",
    location: "Tagaytay Gardens",
    slug: "couples-retreat",
  },
  {
    id: 3,
    name: "Family Getaway",
    image: "/images/experiences/family.webp",
    description: "Room to reconnect, swim, laugh and share a table.",
    location: "Tagaytay Gardens",
    slug: "family-getaway",
  },
  {
    id: 4,
    name: "Coastal Gatherings",
    image: "/images/experiences/coastal.webp",
    description: "A refreshing setting for meaningful time together.",
    location: "Batangas Coast",
    slug: "coastal-gatherings",
  },
];

function ExperienceCard({
  experience,
  index,
  reduceMotion,
}: {
  experience: Experience;
  index: number;
  reduceMotion: boolean | null;
}) {
  const layoutClass =
    index === 0 ? "lg:row-span-2" : index === 3 ? "lg:col-span-2" : "";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: reduceMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        group relative isolate
        min-h-[340px] overflow-hidden
        bg-primary text-white
        sm:min-h-[380px]
        lg:min-h-0
        ${layoutClass}
      `}
    >
      {/* IMAGE */}
      <div className="absolute inset-0 -z-30">
        <img
          src={experience.image}
          alt={experience.name}
          loading="lazy"
          decoding="async"
          className="
            h-full w-full object-cover
            transition-transform duration-1000
            ease-out group-hover:scale-[1.06]
          "
        />
      </div>

      {/* GRADIENT */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-20
          bg-gradient-to-t
          from-[#071D16]/90
          via-[#071D16]/35
          to-[#071D16]/5
        "
      />

      {/* HOVER OVERLAY */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-primary/0
          transition-colors duration-500
          group-hover:bg-primary/20
        "
      />

      {/* CONTENT */}
      <div
        className="
          absolute inset-x-0 bottom-0
          flex flex-col items-start
          px-6 pb-7 pt-16
          sm:px-8 sm:pb-8
          lg:px-7
        "
      >
        {/* LOCATION */}
        <div
          className="
            mb-3 flex items-center gap-2
            text-[10px] font-medium
            uppercase tracking-[0.11em]
            text-white/85
          "
        >
          <MapPin size={13} strokeWidth={1.5} />
          {experience.location}
        </div>

        {/* TITLE */}
        <h3
          className="
            mb-2 font-serif
            text-[clamp(30px,2.6vw,42px)]
            font-normal leading-tight
            tracking-[-0.025em]
          "
        >
          {experience.name}
        </h3>

        {/* DETAILS */}
        <div
          className="
            max-h-[150px] overflow-hidden
            opacity-100 transition-all duration-500
            lg:max-h-0 lg:opacity-0
            lg:group-hover:max-h-[150px]
            lg:group-hover:opacity-100
            lg:group-focus-within:max-h-[150px]
            lg:group-focus-within:opacity-100
          "
        >
          <p
            className="
              mb-4 max-w-[360px]
              text-[13px] leading-6
              text-white/80
            "
          >
            {experience.description}
          </p>

          <Link
            to={`/explore#${experience.slug}`}
            className="
              group/link inline-flex
              items-center gap-3
              border-b border-white/60
              pb-1 text-[10px] font-semibold
              uppercase tracking-[0.1em]
              text-white
              transition-colors duration-300
              hover:border-accent hover:text-[#E7DDC8]
            "
          >
            Discover Experience
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              className="
                transition-transform duration-300
                group-hover/link:translate-x-1
                group-hover/link:-translate-y-1
              "
            />
          </Link>
        </div>
      </div>

      {/* HOVER BORDER */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0
          h-[3px] origin-left scale-x-0
          bg-accent transition-transform
          duration-500
          group-hover:scale-x-100
        "
      />
    </motion.article>
  );
}

export default function Experiences() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="experiences"
      aria-labelledby="experiences-heading"
      className="
        relative overflow-hidden
        bg-base-100
        px-6 py-20
        sm:px-10 sm:py-24
        lg:px-[6vw] lg:py-32
      "
    >
      <div className="mx-auto max-w-[1600px]">
        {/* HEADING */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-12 flex flex-col
            justify-between gap-6
            lg:flex-row lg:items-end
          "
        >
          <div>
            <p
              className="
                mb-5 text-[10px] font-semibold
                uppercase tracking-[0.2em]
                text-primary
              "
            >
              Everything You Came For
            </p>

            <h2
              id="experiences-heading"
              className="
                font-serif font-normal
                text-[clamp(42px,5vw,76px)]
                leading-[1.08]
                tracking-[-0.035em]
                text-primary
              "
            >
              More than <em className="font-normal italic">a stay</em>
            </h2>
          </div>

          <p
            className="
              max-w-[410px]
              text-[14px] leading-8
              text-base-content/65
            "
          >
            Gather, wander, celebrate or simply do nothing at all. The garden is
            yours to enjoy.
          </p>
        </motion.div>

        {/* EXPERIENCE GRID */}
        <div
          className="
            grid grid-cols-1 gap-4
            sm:grid-cols-2
            lg:h-[698px]
            lg:grid-cols-[1.2fr_0.8fr_1fr]
            lg:grid-rows-2
            lg:gap-[18px]
          "
        >
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="
            mt-12 flex flex-col
            items-start justify-between gap-6
            border-t border-primary/10
            pt-8
            sm:flex-row sm:items-center
          "
        >
          <p className="max-w-lg text-sm leading-7 text-base-content/60">
            Discover the moments that make every A&A Garden Suites destination
            memorable.
          </p>

          <Link
            to="/explore"
            className="
              group inline-flex shrink-0
              items-center gap-3
              border-b border-primary
              pb-2 text-[10px] font-semibold
              uppercase tracking-[0.12em]
              text-primary
            "
          >
            Explore All Experiences
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
