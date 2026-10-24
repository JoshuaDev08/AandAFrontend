import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Locations", to: "/locations" },
  { label: "Stay", to: "/accommodations" },
  { label: "Explore", to: "/explore" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const menuVariants = {
  hidden: {
    opacity: 0,
    x: "100%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.065,
      delayChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.35,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Navbar() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const isHomePage = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  // Detect scrolling.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Close menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Mobile menu accessibility and body scroll lock.
  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        menuButtonRef.current?.focus();
        wasOpenRef.current = false;
      }
      return;
    }

    wasOpenRef.current = true;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const container = mobileMenuRef.current;
      if (!container) return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const glassNavbar = scrolled || !isHomePage;

  const mobileMotion = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : menuVariants;

  const linkMotion = reduceMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : itemVariants;

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        initial={false}
        animate={{
          height: glassNavbar ? 74 : 92,
          backgroundColor: glassNavbar
            ? "rgba(247, 244, 237, 0.78)"
            : "rgba(247, 244, 237, 0)",
          color: glassNavbar ? "#173D32" : "#FFFFFF",
          borderColor: glassNavbar
            ? "rgba(23, 61, 50, 0.13)"
            : "rgba(255, 255, 255, 0.22)",
          boxShadow: glassNavbar
            ? "0 8px 36px rgba(10, 35, 26, 0.07)"
            : "0 0 0 rgba(0, 0, 0, 0)",
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed inset-x-0 top-0 z-50
          flex w-full items-center
          justify-between border-b
          px-5 lg:px-[3.5vw]
        "
        style={{
          backdropFilter: glassNavbar ? "blur(20px) saturate(160%)" : "none",
          WebkitBackdropFilter: glassNavbar
            ? "blur(20px) saturate(160%)"
            : "none",
        }}
      >
        {/* BRAND */}
        <Link
          to="/"
          aria-label="A&A Garden Suites — Home"
          className="
            group relative z-10
            flex shrink-0 flex-col
            leading-none
          "
        >
          <span
            className="
              font-serif text-[29px]
              font-medium tracking-[0.04em]
              transition-opacity duration-300
              group-hover:opacity-75
            "
          >
            A&A
          </span>

          <small className="mt-[6px] text-[8px] font-medium tracking-[0.24em]">
            GARDEN SUITES
          </small>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          aria-label="Main navigation"
          className="
            hidden items-center gap-7
            lg:flex xl:gap-9
          "
        >
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `
                group relative
                py-3 text-[11px]
                font-medium tracking-[0.055em]
                transition-opacity duration-300
                hover:opacity-75
                ${isActive ? "font-semibold" : ""}
                `
              }
            >
              {({ isActive }) => (
                <>
                  {label}

                  {/* Underline */}
                  <span
                    className={`
                      absolute bottom-[5px] left-0
                      h-px bg-current
                      transition-all duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP CTA */}
        <Link
          to="/availability"
          className="
            group hidden min-h-[43px]
            items-center justify-center
            gap-3 border border-current
            px-5 text-[10px]
            font-semibold uppercase
            tracking-[0.13em]
            transition-all duration-300
            hover:border-primary
            hover:bg-primary
            hover:text-white
            lg:inline-flex
          "
        >
          Book Your Stay
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            className="
              transition-transform duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />
        </Link>

        {/* MOBILE TRIGGER */}
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
          className="
            relative z-10
            flex h-11 w-11
            items-center justify-center
            border border-current/20
            transition-colors duration-300
            hover:bg-current/5
            lg:hidden
          "
        >
          <Menu size={23} strokeWidth={1.5} />
        </button>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-navigation"
            key="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            variants={mobileMotion}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed inset-0 z-[60]
              flex flex-col
              overflow-y-auto
              bg-base-100 text-primary
              px-6 pb-8 pt-8
              sm:px-10
              lg:hidden
            "
          >
            {/* MOBILE HEADER */}
            <div className="flex items-start justify-between">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex flex-col leading-none"
              >
                <span className="font-serif text-[30px] tracking-[0.04em]">
                  A&A
                </span>

                <small className="mt-[6px] text-[8px] tracking-[0.24em]">
                  GARDEN SUITES
                </small>
              </Link>

              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setOpen(false)}
                className="
                  flex h-11 w-11
                  items-center justify-center
                  border border-primary/20
                  transition-colors
                  hover:bg-primary/5
                "
              >
                <X size={23} strokeWidth={1.5} />
              </button>
            </div>

            {/* MOBILE LINKS */}
            <motion.nav
              aria-label="Mobile navigation links"
              className="
                flex flex-1 flex-col
                justify-center gap-4
                py-12 sm:gap-5
              "
            >
              <motion.div variants={linkMotion}>
                <NavLink
                  to="/"
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block font-serif text-[clamp(35px,8vw,57px)] leading-[1.12] transition-colors hover:text-secondary ${
                      isActive ? "text-secondary" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
              </motion.div>

              {navLinks.map(({ label, to }) => (
                <motion.div key={to} variants={linkMotion}>
                  <NavLink
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `
                      block font-serif
                      text-[clamp(35px,8vw,57px)]
                      leading-[1.12]
                      transition-colors duration-300
                      hover:text-secondary
                      ${isActive ? "text-secondary" : ""}
                      `
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>

            {/* MOBILE FOOTER */}
            <motion.div
              variants={linkMotion}
              className="border-t border-primary/15 pt-6"
            >
              <Link
                to="/availability"
                onClick={() => setOpen(false)}
                className="
                  btn btn-primary
                  flex h-14 w-full
                  items-center justify-between
                  rounded-none px-6
                  text-[11px] font-semibold
                  uppercase tracking-[0.13em]
                "
              >
                Check Availability
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </Link>

              <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-primary/50">
                A&A Garden Suites
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
