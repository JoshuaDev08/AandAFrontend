import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

// Replace these with your actual Figma images.
const collections = [
  {
    id: "casa-aurora",
    name: "Casa Aurora",
    accent: "Aurora",
    eyebrow: "The Lively Garden House",
    description:
      "Bright, social and close to the heart of the resort, with generous rooms and easy access to the pool and gardens.",
    image: "/images/casa-aurora.webp",
    imageAlt: "Casa Aurora pool and lush mountain view",
    href: "/locations/tagaytay/properties/casa-aurora",
    number: "01",
  },
  {
    id: "casa-beatriz",
    name: "Casa Beatriz",
    accent: "Beatriz",
    eyebrow: "The Intimate Garden Hideaway",
    description:
      "Calm, private and made for slowing down—a peaceful collection for couples and quiet weekend escapes.",
    image: "/images/casa-beatriz.webp",
    imageAlt: "Casa Beatriz garden villa surrounded by tropical foliage",
    href: "/locations/tagaytay/properties/casa-beatriz",
    number: "02",
  },
];

export default function Collections() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="collections"
      aria-label="Explore our Casa collections"
      className="relative overflow-hidden bg-primary"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {collections.map((collection, index) => (
          <motion.article
            key={collection.id}
            initial={reduceMotion ? false : { opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.85,
              delay: reduceMotion ? 0 : index * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              group relative isolate
              flex min-h-[580px] flex-col
              justify-end overflow-hidden
              bg-primary text-white
              sm:min-h-[650px]
              lg:min-h-[720px]
              xl:min-h-[760px]
            "
          >
            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0 -z-30 overflow-hidden">
              <motion.img
                src={collection.image}
                alt={collection.imageAlt}
                loading="lazy"
                decoding="async"
                whileHover={reduceMotion ? undefined : { scale: 1.055 }}
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  h-full w-full
                  object-cover object-center
                  transition-transform duration-1000
                  group-hover:scale-[1.055]
                "
              />
            </div>

            {/* CINEMATIC GRADIENT */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-0 -z-20
                bg-gradient-to-t
                from-[#071D16]/95
                via-[#071D16]/50
                to-[#071D16]/10
              "
            />

            {/* SUBTLE LEFT SHADE */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-0 -z-10
                bg-gradient-to-r
                from-[#071D16]/30
                to-transparent
              "
            />

            {/* TOP NUMBER */}
            <span
              aria-hidden="true"
              className="
                absolute right-7 top-8
                font-serif text-[60px]
                leading-none text-white/25
                sm:right-10 sm:top-10
                lg:text-[75px]
              "
            >
              {collection.number}
            </span>

            {/* CONTENT */}
            <div
              className="
                relative z-10
                px-7 pb-12 pt-24
                sm:px-12 sm:pb-14
                lg:px-[8%] lg:pb-[8%]
              "
            >
              {/* EYEBROW */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.65,
                  delay: reduceMotion ? 0 : 0.15,
                }}
                className="mb-5 flex items-center gap-3"
              >
                <span className="h-px w-9 bg-accent" />

                <p
                  className="
                    m-0 text-[10px] font-semibold
                    uppercase tracking-[0.2em]
                    text-white/85
                  "
                >
                  {collection.eyebrow}
                </p>
              </motion.div>

              {/* TITLE */}
              <motion.h2
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.75,
                  delay: reduceMotion ? 0 : 0.22,
                }}
                className="
                  mb-5 font-serif font-normal
                  text-[clamp(48px,4.3vw,70px)]
                  leading-[1.06]
                  tracking-[-0.04em]
                  text-white
                "
              >
                Casa{" "}
                <em className="font-normal italic text-[#E7DDC8]">
                  {collection.accent}
                </em>
              </motion.h2>

              {/* DESCRIPTION */}
              <p
                className="
                  mb-8 max-w-[520px]
                  text-[14px] leading-[1.9]
                  text-white/80
                  sm:text-[15px]
                "
              >
                {collection.description}
              </p>

              {/* ACTION */}
              <Link
                to={collection.href}
                className="
                  group/link inline-flex
                  items-center gap-4
                  border-b border-white/60
                  pb-2 text-[10px] font-semibold
                  uppercase tracking-[0.13em]
                  text-white transition-colors
                  duration-300
                  hover:border-accent hover:text-[#E7DDC8]
                "
              >
                Explore {collection.name}
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  className="
                    transition-transform duration-300
                    group-hover/link:translate-x-1
                    group-hover/link:-translate-y-1
                  "
                />
              </Link>
            </div>

            {/* HOVER BORDER ACCENT */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-x-0 bottom-0
                h-[3px] origin-left scale-x-0
                bg-accent transition-transform
                duration-700
                group-hover:scale-x-100
              "
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
