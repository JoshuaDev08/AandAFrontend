import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  light?: boolean;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  className = "",
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75 }}
      className={`
        mb-12 flex flex-col justify-between
        gap-6 lg:flex-row lg:items-end
        ${className}
      `}
    >
      <div>
        <p
          className={`
            mb-5 text-[10px] font-semibold
            uppercase tracking-[0.2em]
            ${light ? "text-white/75" : "text-primary"}
          `}
        >
          {eyebrow}
        </p>

        <h2
          className={`
            font-serif text-[clamp(42px,5vw,76px)]
            font-normal leading-[1.08]
            tracking-[-0.035em]
            ${light ? "text-white" : "text-primary"}
          `}
        >
          {title}
        </h2>
      </div>

      {description && (
        <p
          className={`
            max-w-[410px] text-[14px] leading-8
            ${light ? "text-white/70" : "text-base-content/65"}
          `}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
