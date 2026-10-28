import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type EditorialHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt?: string;
};

export default function EditorialHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
}: EditorialHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label={eyebrow}
      className="
        relative isolate flex min-h-[620px]
        items-end overflow-hidden bg-primary
        text-white sm:min-h-[700px]
        lg:min-h-[750px] lg:h-[85svh]
      "
    >
      <motion.img
        src={image}
        alt={imageAlt}
        initial={reduceMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-gradient-to-r
          from-[#071D16]/85
          via-[#071D16]/45
          to-[#071D16]/15
        "
      />

      <div className="mx-auto w-full max-w-[1600px] px-6 pb-20 pt-40 sm:px-10 lg:px-[8vw] lg:pb-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: reduceMotion ? 0 : 0.15,
          }}
          className="max-w-[900px]"
        >
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.23em] text-white/80">
            {eyebrow}
          </p>

          <h1 className="font-serif text-[clamp(50px,7vw,100px)] font-normal leading-[1.05] tracking-[-0.04em]">
            {title}
          </h1>

          <p className="mt-7 max-w-[590px] text-[15px] leading-[1.9] text-white/85 sm:text-[17px]">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
