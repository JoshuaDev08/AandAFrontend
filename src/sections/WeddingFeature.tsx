
import { Link } from "react-router";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  Heart,
} from "lucide-react";

// Replace these paths with your actual Figma photographs.
const WEDDING_IMAGE = "/images/weddings/garden-wedding.webp";
const BRIDE_IMAGE = "/images/weddings/bride-detail.webp";

// These are wedding service highlights from your design.
// Confirm individual package inclusions before publishing them.
const weddingServices = [
  "Ceremony Venue",
  "Wedding Preparation",
  "Prenuptial Photography",
  "Catering & Reception",
  "Guest Accommodation",
];

export default function WeddingFeature() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
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
      id="weddings"
      aria-labelledby="wedding-heading"
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
          grid-cols-1 items-center
          gap-16
          lg:grid-cols-[0.8fr_1.1fr]
          lg:gap-[8vw]
        "
      >
        {/* LEFT: WEDDING CONTENT */}
        <div className="relative z-10">
          {/* Eyebrow */}
          <motion.div
            {...reveal(0)}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-px w-10 bg-accent" />

            <p
              className="
                m-0 text-[10px] font-semibold
                uppercase tracking-[0.2em]
                text-primary
              "
            >
              Weddings at A&A
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="wedding-heading"
            {...reveal(0.12)}
            className="
              mb-7 font-serif font-normal
              text-[clamp(44px,5vw,76px)]
              leading-[1.08]
              tracking-[-0.035em]
              text-primary
            "
          >
            Begin forever
            <br />
            <em className="font-normal italic">
              surrounded by nature.
            </em>
          </motion.h2>

          {/* Description */}
          <motion.p
            {...reveal(0.22)}
            className="
              mb-9 max-w-[520px]
              text-[14px] leading-[1.95]
              text-base-content/65
              sm:text-[15px]
            "
          >
            Exchange vows under open skies, gather around a
            beautiful table, and let the garden become part
            of your story.
          </motion.p>

          {/* Numbered service list */}
          <motion.div
            {...reveal(0.3)}
            className="mb-10 border-t border-primary/15"
          >
            {weddingServices.map((service, index) => (
              <motion.div
                key={service}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: -15 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion
                    ? 0
                    : 0.08 * index,
                }}
                className="
                  group flex items-center gap-5
                  border-b border-primary/15
                  py-[15px]
                  transition-colors duration-300
                  hover:bg-primary/5
                  sm:gap-7
                "
              >
                <span
                  className="
                    w-9 shrink-0
                    text-[11px] font-medium
                    tracking-[0.1em]
                    text-accent
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className="
                    font-serif
                    text-[17px] font-normal
                    text-primary
                    sm:text-[19px]
                  "
                >
                  {service}
                </span>

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="
                    ml-auto text-primary/25
                    opacity-0
                    transition-all duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                    group-hover:opacity-100
                  "
                />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div {...reveal(0.42)}>
            <Link
              to="/explore#weddings"
              className="
                group inline-flex min-h-[54px]
                items-center justify-center gap-6
                border border-primary
                px-7
                text-[10px] font-semibold
                uppercase tracking-[0.13em]
                text-primary
                transition-all duration-300
                hover:bg-primary hover:text-primary-content
              "
            >
              Discover Wedding Packages

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
          </motion.div>
        </div>

        {/* RIGHT: WEDDING PHOTOGRAPHY */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, x: 40 }
          }
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative min-w-0
            pb-20 pl-10
            sm:pb-24 sm:pl-16
            lg:pb-24 lg:pl-16
          "
        >
          {/* Gold accent detail */}
          <div
            aria-hidden="true"
            className="
              absolute right-0 top-0
              h-px w-24 bg-accent
            "
          />

          {/* Main wedding photograph */}
          <div className="group relative overflow-hidden bg-primary/10">
            <img
              src={WEDDING_IMAGE}
              alt="Wedding celebration surrounded by lush tropical gardens"
              loading="lazy"
              decoding="async"
              className="
                h-[420px] w-full
                object-cover object-center
                transition-transform duration-1000
                ease-out
                group-hover:scale-[1.045]
                sm:h-[580px]
                lg:h-[680px]
                xl:h-[710px]
              "
            />

            {/* Soft image vignette */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-t
                from-primary/20
                via-transparent to-transparent
              "
            />
          </div>

          {/* Floating detail photograph */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 30 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: reduceMotion ? 0 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute bottom-0 left-0
              w-[140px]
              border-[6px] border-base-100
              shadow-[0_18px_40px_rgba(23,61,50,0.12)]
              sm:w-[200px] sm:border-[9px]
              lg:w-[230px]
            "
          >
            <img
              src={BRIDE_IMAGE}
              alt="Bride holding an elegant wedding bouquet"
              loading="lazy"
              decoding="async"
              className="
                h-[185px] w-full object-cover
                sm:h-[260px]
                lg:h-[300px]
              "
            />
          </motion.div>

          {/* Small decorative caption */}
          <div
            className="
              absolute bottom-7 right-0
              hidden items-center gap-3
              sm:flex
            "
          >
            <Heart
              size={16}
              strokeWidth={1.3}
              className="text-accent"
            />

            <span
              className="
                text-[9px] font-medium
                uppercase tracking-[0.17em]
                text-primary/65
              "
            >
              Your Story, Beautifully Told
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
