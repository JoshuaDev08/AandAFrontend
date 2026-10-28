import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import { useLocations } from "../hooks/usePublicData";

// Replace this with your original Figma garden image.
const CTA_IMAGE = "/images/final-cta-garden.webp";

export default function FinalCTA() {
  const reduceMotion = useReducedMotion();

  const { data: locations = [] } = useLocations();

  const locationCount = locations.length;

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: {
      duration: 0.85,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  const destinationHeadline =
    locationCount > 1
      ? `${locationCount} beautiful destinations to discover.`
      : "Your next escape begins here.";

  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="
        relative isolate
        flex min-h-[620px]
        items-center justify-center
        overflow-hidden bg-primary
        px-6 py-24 text-white
        sm:min-h-[680px]
        sm:px-10
        lg:min-h-[720px]
      "
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <motion.img
          src={CTA_IMAGE}
          alt=""
          loading="lazy"
          decoding="async"
          initial={reduceMotion ? false : { scale: 1.07 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* FOREST-GREEN OVERLAY */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-20
          bg-[#082319]/65
        "
      />

      {/* CINEMATIC GRADIENT */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-gradient-to-t
          from-[#071D16]/65
          via-transparent
          to-[#071D16]/20
        "
      />

      {/* DECORATIVE TOP DETAIL */}
      <div
        aria-hidden="true"
        className="
          absolute left-1/2 top-12
          h-12 w-px -translate-x-1/2
          bg-white/40
          sm:top-14
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative z-10
          mx-auto flex max-w-[1100px]
          flex-col items-center
          text-center
        "
      >
        {/* EYEBROW */}
        <motion.div {...reveal(0)} className="mb-7 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />

          <p
            className="
              m-0 text-[10px] font-semibold
              uppercase tracking-[0.23em]
              text-white/85
            "
          >
            Find Your A&A
          </p>

          <span className="h-px w-8 bg-accent" />
        </motion.div>

        {/* HEADING */}
        <motion.h2
          id="final-cta-heading"
          {...reveal(0.14)}
          className="
            mb-7 font-serif font-normal
            text-[clamp(44px,6vw,84px)]
            leading-[1.08]
            tracking-[-0.04em]
          "
        >
          One warm welcome.
          <br />
          <em className="font-normal italic text-[#E7DDC8]">
            {destinationHeadline}
          </em>
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          {...reveal(0.26)}
          className="
            mb-10 max-w-[600px]
            font-serif text-[18px]
            leading-[1.7] text-white/85
            sm:text-[21px]
          "
        >
          Choose your setting. We'll take care of the rest.
        </motion.p>

        {/* ACTIONS */}
        <motion.div
          {...reveal(0.38)}
          className="
            flex flex-col
            items-center justify-center
            gap-6
            sm:flex-row sm:gap-9
          "
        >
          {/* PRIMARY CTA */}
          <Link
            to="/availability"
            className="
              group inline-flex min-h-[56px]
              items-center justify-center gap-7
              border border-white bg-white
              px-8 text-[11px] font-semibold
              uppercase tracking-[0.13em]
              text-primary
              transition-all duration-300
              hover:bg-[#E8DFD1]
            "
          >
            Book Your Stay
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </Link>

          {/* SECONDARY CTA */}
          <Link
            to="/locations"
            className="
              group inline-flex
              items-center gap-4
              border-b border-white/65
              pb-2 text-[11px] font-semibold
              uppercase tracking-[0.12em]
              text-white
              transition-colors duration-300
              hover:border-accent
              hover:text-[#E7DDC8]
            "
          >
            Compare Locations
            <ArrowRight
              size={18}
              strokeWidth={1.5}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </motion.div>
      </div>

      {/* BOTTOM DECORATIVE DETAIL */}
      <div
        aria-hidden="true"
        className="
          absolute bottom-12 left-1/2
          h-12 w-px -translate-x-1/2
          bg-white/30
        "
      />
    </section>
  );
}
