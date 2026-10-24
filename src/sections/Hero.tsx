import { useState } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import BookingBar from "./BookingBar";

const HERO_IMAGE = "/images/hero_background.jpg";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section id="home" aria-labelledby="hero-heading">
      {/* HERO IMAGE AREA */}
      <div
        className="
          relative isolate
          flex min-h-[650px] flex-col
          overflow-hidden bg-primary text-white
          sm:min-h-[720px]
          lg:min-h-[760px] lg:h-svh
        "
      >
        <motion.img
          src={HERO_IMAGE}
          alt=""
          fetchPriority="high"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          initial={reduceMotion ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 18, ease: "easeOut" }}
          className={`
            absolute inset-0 -z-30
            h-full w-full object-cover object-center
            transition-opacity duration-1000
            ${imageLoaded ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Image overlays */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0 -z-20
            bg-gradient-to-r
            from-[#0A1F19]/85
            via-[#0A1F19]/45
            to-[#0A1F19]/15
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute inset-0 -z-10
            bg-gradient-to-t
            from-[#05140F]/65
            via-transparent
            to-[#05140F]/15
          "
        />

        {/* CONTENT */}
        <div
          className="
            mx-auto flex w-full max-w-[1600px]
            flex-1 flex-col justify-center
            px-6 pb-20 pt-36
            sm:px-10
            lg:px-[8vw]
            xl:pb-[150px]
          "
        >
          <div className="max-w-[850px]">
            <motion.div {...reveal(0.1)}>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-10 bg-[#C4A56A]" />

                <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 sm:text-[11px]">
                  Welcome to A&A Garden Suites
                </p>
              </div>
            </motion.div>

            <motion.h1
              id="hero-heading"
              {...reveal(0.25)}
              className="
                m-0 max-w-[900px]
                font-serif font-normal
                text-[clamp(2.9rem,6vw,6.5rem)]
                leading-[1.08]
                tracking-[-0.04em]
              "
            >
              Your private escape,
              <br />
              <em className="font-normal italic text-[#E7DDC8]">
                wherever you choose to stay.
              </em>
            </motion.h1>

            <motion.p
              {...reveal(0.42)}
              className="
                mt-7 max-w-[570px]
                text-[15px] leading-[1.8]
                text-white/85
                sm:text-[17px]
              "
            >
              Discover peaceful stays, intimate celebrations, and unforgettable
              moments across A&A's collection of nature-led destinations.
            </motion.p>

            <motion.div
              {...reveal(0.57)}
              className="mt-9 flex flex-wrap items-center gap-6 sm:gap-9"
            >
              <Link
                to="/locations"
                className="
                  group inline-flex min-h-[52px]
                  items-center justify-center gap-5
                  border border-white bg-white
                  px-6 text-[10px] font-semibold
                  uppercase tracking-[0.13em]
                  text-primary transition-colors
                  hover:bg-[#E8DFD1]
                "
              >
                Explore Our Locations
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <Link
                to="/about"
                className="
                  group inline-flex items-center gap-3
                  border-b border-white/60
                  py-2 text-[10px] font-semibold
                  uppercase tracking-[0.1em]
                "
              >
                Discover Our Story
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Desktop scroll indicator */}
        <motion.a
          href="#home-intro"
          aria-label="Scroll to discover more"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="
            absolute right-[2.5vw] top-1/2
            hidden -translate-y-1/2
            items-center gap-4
            text-[9px] uppercase tracking-[0.2em]
            text-white/80 xl:flex
          "
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll to Discover
          <ArrowDown size={16} strokeWidth={1} />
        </motion.a>
      </div>

     
    </section>
  );
}
