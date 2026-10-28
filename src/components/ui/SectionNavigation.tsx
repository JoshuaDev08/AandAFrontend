import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLocation } from "react-router";

type NavigationItem = {
  id: string;
  label: string;
};

type SectionNavigationProps = {
  items: NavigationItem[];
};

export default function SectionNavigation({ items }: SectionNavigationProps) {
  const { hash } = useLocation();
  const [active, setActive] = useState(hash.slice(1) || items[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);

        if (visible) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-140px 0px -55% 0px",
        threshold: 0,
      },
    );

    items.forEach(({ id }) => {
      const element = document.getElementById(id);

      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Page sections"
      className="
        sticky top-[74px] z-30
        border-b border-primary/10
        bg-base-100/90 backdrop-blur-xl
      "
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-8 overflow-x-auto px-6 sm:px-10 lg:justify-center">
        {items.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setActive(id)}
            aria-current={active === id ? "location" : undefined}
            className={`
              relative shrink-0 py-4
              text-[10px] font-semibold
              uppercase tracking-[0.12em]
              transition-colors
              ${
                active === id
                  ? "text-primary"
                  : "text-base-content/55 hover:text-primary"
              }
            `}
          >
            {label}

            {active === id && (
              <motion.span
                layoutId="section-nav-underline"
                className="absolute inset-x-0 bottom-0 h-[2px] bg-accent"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 35,
                }}
              />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
