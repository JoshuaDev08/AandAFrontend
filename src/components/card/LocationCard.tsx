import type { ResortLocation } from "../../types/public";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function LocationCard({
  location,
  index,
  reduceMotion,
}: {
  location: ResortLocation;
  index: number;
  reduceMotion: boolean | null;
}) {
  const isFeatured = index === 0;
  const imageUrl = location.featured_image;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.65,
        delay: reduceMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group flex h-full flex-col
        bg-base-100
        shadow-[0_18px_45px_rgba(23,61,50,0.06)]
        transition-shadow duration-500
        hover:shadow-[0_24px_60px_rgba(23,61,50,0.13)]
      "
    >
      {/* LOCATION IMAGE */}
      <Link
        to={`/locations/${encodeURIComponent(location.slug)}`}
        aria-label={`Explore ${location.name}`}
        className={`
          relative block overflow-hidden
          bg-primary/10
          ${
            isFeatured
              ? "h-[310px] lg:h-[400px] xl:h-[460px]"
              : "h-[310px] lg:h-[360px] xl:h-[390px]"
          }
        `}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${location.name} resort`}
            loading="lazy"
            decoding="async"
            className="
              h-full w-full object-cover
              transition-transform duration-1000
              ease-out group-hover:scale-[1.055]
            "
          />
        ) : (
          <div
            className="
              flex h-full w-full items-center
              justify-center bg-primary/10
              text-primary/40
            "
          >
            <MapPin size={42} strokeWidth={1} />
          </div>
        )}

        {/* Image gradient */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t
            from-primary/35 via-transparent to-transparent
          "
        />

        {location.is_featured && (
          <span
            className="
              badge badge-accent
              absolute left-5 top-5
              h-auto rounded-full px-4 py-2
              text-[9px] font-semibold
              uppercase tracking-[0.12em]
              text-primary
            "
          >
            Featured Destination
          </span>
        )}

        <span
          className="
            absolute bottom-5 right-5
            flex h-11 w-11 items-center justify-center
            border border-white/60
            bg-white/15 text-white
            backdrop-blur-md
            transition-all duration-300
            group-hover:border-white
            group-hover:bg-white group-hover:text-primary
          "
          aria-hidden="true"
        >
          <ArrowUpRight size={20} strokeWidth={1.5} />
        </span>
      </Link>

      {/* CARD CONTENT */}
      <div
        className="
          flex flex-1 flex-col
          px-6 pb-7 pt-7
          sm:px-7
        "
      >
        <p
          className="
            mb-3 flex items-center gap-2
            text-[10px] font-semibold
            uppercase tracking-[0.16em]
            text-secondary
          "
        >
          <MapPin size={13} strokeWidth={1.5} />
          A&A Garden Suites
        </p>

        <h3
          className="
            mb-4 font-serif
            text-[clamp(29px,2.5vw,38px)]
            font-normal leading-tight
            tracking-[-0.025em] text-primary
          "
        >
          {location.name}
        </h3>

        <p
          className="
            mb-7 line-clamp-3
            text-[13px] leading-7
            text-base-content/65
          "
        >
          {location.description ||
            "Discover this A&A Garden Suites destination and explore its accommodations."}
        </p>

        <div className="mt-auto border-t border-primary/15 pt-5">
          <Link
            to={`/locations/${encodeURIComponent(location.slug)}`}
            className="
              group/link inline-flex items-center gap-3
              text-[10px] font-semibold
              uppercase tracking-[0.13em]
              text-primary
            "
          >
            Explore Location
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
    </motion.article>
  );
}
