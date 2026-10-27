import { useMemo } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import LocationCard from "../components/card/LocationCard";

import { useLocations } from "../hooks/usePublicData";

export default function FeaturedLocations() {
  const reduceMotion = useReducedMotion();

  const { data: locations = [], isPending, isError, refetch } = useLocations();

  const featuredLocations = useMemo(() => {
    return [...locations]
      .sort(
        (a, b) =>
          Number(Boolean(b.is_featured)) - Number(Boolean(a.is_featured)),
      )
      .slice(0, 3);
  }, [locations]);

  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
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
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
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
              One Welcome, Many Settings
            </p>

            <h2
              id="locations-heading"
              className="
                m-0 font-serif font-normal
                text-[clamp(42px,5vw,76px)]
                leading-[1.08] tracking-[-0.035em]
                text-primary
              "
            >
              Choose your <em className="font-normal">A&A escape.</em>
            </h2>
          </div>

          <p
            className="
              max-w-[410px] text-[14px]
              leading-8 text-base-content/65
              lg:mb-2
            "
          >
            Discover distinct destinations, each with its own atmosphere and
            thoughtfully designed places to stay.
          </p>
        </motion.div>

        {/* LOADING */}
        {isPending && (
          <div
            role="status"
            aria-label="Loading resort locations"
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-base-100 p-4">
                <div className="skeleton h-[300px] w-full rounded-none" />
                <div className="skeleton mt-6 h-8 w-3/4 rounded-none" />
                <div className="skeleton mt-4 h-20 w-full rounded-none" />
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {isError && (
          <div
            role="alert"
            className="
              border border-primary/10
              bg-base-100 px-8 py-12 text-center
            "
          >
            <p className="font-serif text-2xl text-primary">
              Our destinations are temporarily unavailable.
            </p>

            <p className="mt-3 text-sm text-base-content/60">
              Please try loading the locations again.
            </p>

            <button
              type="button"
              onClick={() => void refetch()}
              className="btn btn-primary mt-6 rounded-none"
            >
              Try Again
            </button>
          </div>
        )}

        {/* CARDS */}
        {!isPending && !isError && (
          <>
            {featuredLocations.length > 0 ? (
              <div
                className="
                  grid items-start gap-6
                  md:grid-cols-2
                  xl:grid-cols-[1.15fr_1fr_1fr]
                "
              >
                {featuredLocations.map((location, index) => (
                  <LocationCard
                    key={location.id}
                    location={location}
                    index={index}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
            ) : (
              <div
                className="
                  border border-primary/10
                  bg-base-100 px-6 py-12
                  text-center text-sm
                  text-base-content/60
                "
              >
                No resort locations are currently available.
              </div>
            )}
          </>
        )}

        {/* VIEW ALL LOCATIONS */}
        {!isError && (
          <div className="mt-14 flex justify-center">
            <Link
              to="/locations"
              className="
                group inline-flex min-h-[54px]
                items-center justify-center gap-7
                border border-primary
                px-8 text-[11px] font-semibold
                uppercase tracking-[0.13em]
                text-primary
                transition-colors duration-300
                hover:bg-primary hover:text-white
              "
            >
              View All Locations
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
          </div>
        )}
      </div>
    </section>
  );
}
