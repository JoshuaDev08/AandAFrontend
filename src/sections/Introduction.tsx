import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Leaf } from "lucide-react";

import { useLocations } from "../hooks/usePublicData";

// Place your resort villa image here.
const INTRO_IMAGE = "/images/aanda-villa.webp";

export default function Introduction() {
  const reduceMotion = useReducedMotion();
  const { data: locations = [], isSuccess } = useLocations();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30 },
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
      id="home-intro"
      aria-labelledby="introduction-heading"
      className="
        relative overflow-hidden
        bg-base-100
        px-6 py-20
        sm:px-10 sm:py-24
        lg:px-[6vw] lg:py-36
      "
    >
      <div
        className="
          mx-auto grid max-w-[1600px]
          items-center gap-14
          lg:grid-cols-[0.9fr_1.1fr]
          lg:gap-[8vw]
        "
      >
        {/* LEFT: EDITORIAL CONTENT */}
        <div className="lg:pl-[2vw]">
          <motion.div {...reveal(0)}>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" />

              <p
                className="
                  m-0 text-[10px] font-semibold
                  uppercase tracking-[0.2em]
                  text-primary
                "
              >
                A Quieter Kind of Getaway
              </p>
            </div>
          </motion.div>

          <motion.h2
            id="introduction-heading"
            {...reveal(0.12)}
            className="
              mb-8 font-serif font-normal
              text-[clamp(44px,5vw,76px)]
              leading-[1.08]
              tracking-[-0.035em]
              text-primary
            "
          >
            Where moments
            <br />
            <em className="font-normal italic">slow down.</em>
          </motion.h2>

          <motion.p
            {...reveal(0.22)}
            className="
              mb-7 max-w-[560px]
              font-serif text-[clamp(20px,2vw,25px)]
              leading-[1.55] text-base-content
            "
          >
            Across every A&A destination, we create places to reconnect—with
            nature, with people you love, and with yourself.
          </motion.p>

          <motion.p
            {...reveal(0.32)}
            className="
              mb-9 max-w-[530px]
              text-[14px] leading-[1.95]
              text-base-content/65
            "
          >
            From our original Tagaytay garden retreat to the unique settings of
            our growing collection, every stay is shaped by its surroundings and
            made warmer by thoughtful Filipino hospitality.
          </motion.p>

          <motion.div {...reveal(0.42)}>
            <Link
              to="/about"
              className="
                group inline-flex items-center
                gap-4 border-b border-primary
                pb-2 text-[11px] font-semibold
                uppercase tracking-[0.12em]
                text-primary
                transition-colors duration-300
                hover:text-secondary
              "
            >
              Discover Our Story
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

        {/* RIGHT: PHOTOGRAPHY */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 45 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative min-w-0
            pb-16 pl-5
            sm:pl-12
            lg:pb-12 lg:pl-8
          "
        >
          {/* Photo frame */}
          <div
            className="
              group relative overflow-hidden
              bg-primary/10
            "
          >
            <img
              src={INTRO_IMAGE}
              alt="A&A Garden Suites villa surrounded by tropical greenery"
              loading="lazy"
              decoding="async"
              className="
                h-[420px] w-full object-cover
                transition-transform duration-1000
                ease-out group-hover:scale-[1.04]
                sm:h-[580px]
                lg:h-[680px]
                xl:h-[720px]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-0
                bg-gradient-to-t
                from-primary/15 to-transparent
              "
            />
          </div>

          {/* Floating information card */}
          {isSuccess && locations.length > 0 && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: reduceMotion ? 0 : 0.3,
              }}
              className="
                absolute bottom-0 left-0
                flex max-w-[270px]
                items-center gap-5
                bg-primary px-6 py-6
                text-primary-content
                shadow-[0_16px_40px_rgba(23,61,50,0.17)]
                sm:px-8 sm:py-7
              "
            >
              <strong
                className="
                  font-serif text-[52px]
                  font-normal leading-none
                "
              >
                {locations.length.toString().padStart(2, "0")}
              </strong>

              <div className="flex flex-col gap-2">
                <Leaf size={19} strokeWidth={1.3} className="text-accent" />

                <span
                  className="
                    text-[11px] leading-[1.6]
                    text-white/90
                  "
                >
                  {locations.length === 1
                    ? "Destination to discover"
                    : "Destinations to discover"}
                  <br />
                  One warm welcome
                </span>
              </div>
            </motion.div>
          )}

          {/* Decorative border */}
          <div
            aria-hidden="true"
            className="
              absolute right-[-12px] top-6
              -z-10 hidden h-[85%] w-[85%]
              border border-primary/15
              lg:block
            "
          />
        </motion.div>
      </div>
    </section>
  );
}
