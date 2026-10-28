import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, MapPin, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

import { useLocations } from "../../hooks/usePublicData";

const discoverLinks = [
  { label: "Stay", to: "/accommodations" },
  { label: "Experiences", to: "/explore" },
  { label: "Events", to: "/explore#events" },
  { label: "Gallery", to: "/explore#gallery" },
  { label: "Contact Us", to: "/contact" },
];

const legalLinks = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Booking Policies", to: "/booking-policies" },
];

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const { data: locations = [], isPending } = useLocations();

  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const currentYear = new Date().getFullYear();

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  function handleNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Newsletter endpoint is not implemented yet.
    // Do not claim that the email was subscribed.
    setNewsletterMessage("Newsletter subscriptions will be available soon.");
  }

  return (
    <footer
      id="footer"
      className="
        overflow-hidden
        bg-[#102D25]
        px-6 pb-7 pt-16
        text-white
        sm:px-10 sm:pt-20
        lg:px-[6vw]
      "
    >
      <div className="mx-auto max-w-[1600px]">
        {/* FOOTER TOP */}
        <div
          className="
            grid grid-cols-1 gap-12
            sm:grid-cols-2
            lg:grid-cols-[1.4fr_0.7fr_0.7fr_1.1fr]
            lg:gap-10
            xl:gap-[5vw]
          "
        >
          {/* BRAND */}
          <motion.div {...reveal}>
            <Link
              to="/"
              aria-label="A&A Garden Suites — Home"
              className="inline-flex flex-col leading-none"
            >
              <span
                className="
                  font-serif text-[40px]
                  font-normal tracking-[0.045em]
                  sm:text-[44px]
                "
              >
                A&A
              </span>

              <small
                className="
                  mt-2 text-[9px]
                  font-medium uppercase
                  tracking-[0.26em]
                  text-white/80
                "
              >
                Garden Suites
              </small>
            </Link>

            <p
              className="
                mt-7 max-w-[310px]
                text-[13px] leading-[1.9]
                text-white/60
              "
            >
              A growing collection of nature-led stays, celebrations and
              meaningful escapes across the Philippines.
            </p>

            {/* Decorative accent */}
            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />

              <span
                className="
                  text-[9px] uppercase
                  tracking-[0.18em]
                  text-white/50
                "
              >
                Stay Close to Nature
              </span>
            </div>
          </motion.div>

          {/* LOCATIONS */}
          <motion.div {...reveal}>
            <h3 className="mb-6 font-serif text-[19px] font-normal">
              Locations
            </h3>

            <nav
              aria-label="Resort locations"
              className="flex flex-col items-start gap-3"
            >
              {isPending ? (
                <span className="loading loading-dots loading-sm text-white/50" />
              ) : locations.length > 0 ? (
                locations.map((location) => (
                  <Link
                    key={location.id}
                    to={`/locations/${encodeURIComponent(location.slug)}`}
                    className="
                      group inline-flex
                      items-center gap-2
                      text-[12px] leading-6
                      text-white/65
                      transition-colors duration-300
                      hover:text-white
                    "
                  >
                    <MapPin
                      size={12}
                      strokeWidth={1.5}
                      className="
                        shrink-0 text-accent/70
                        transition-colors
                        group-hover:text-accent
                      "
                    />

                    {location.name}
                  </Link>
                ))
              ) : (
                <Link
                  to="/locations"
                  className="text-[12px] text-white/65 hover:text-white"
                >
                  Explore Our Locations
                </Link>
              )}

              {locations.length > 0 && (
                <Link
                  to="/locations"
                  className="
                    group mt-2 inline-flex
                    items-center gap-2
                    text-[10px] font-semibold
                    uppercase tracking-[0.12em]
                    text-white
                    transition-colors
                    hover:text-accent
                  "
                >
                  All Locations
                  <ArrowUpRight
                    size={14}
                    className="
                      transition-transform duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </Link>
              )}
            </nav>
          </motion.div>

          {/* DISCOVER */}
          <motion.div {...reveal}>
            <h3 className="mb-6 font-serif text-[19px] font-normal">
              Discover
            </h3>

            <nav
              aria-label="Explore A&A"
              className="flex flex-col items-start gap-3"
            >
              {discoverLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="
                    group inline-flex
                    items-center gap-2
                    text-[12px] leading-6
                    text-white/65
                    transition-colors duration-300
                    hover:text-white
                  "
                >
                  <span
                    className="
                      transition-transform duration-300
                      group-hover:translate-x-1
                    "
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* NEWSLETTER */}
          <motion.div {...reveal}>
            <h3 className="mb-6 font-serif text-[19px] font-normal">
              From A&A
            </h3>

            <p
              className="
                mb-7 max-w-[300px]
                text-[13px] leading-[1.8]
                text-white/60
              "
            >
              New destinations, special stays and quiet inspiration.
            </p>

            <form
              onSubmit={handleNewsletter}
              className="
                flex items-center
                border-b border-white/35
                transition-colors duration-300
                focus-within:border-accent
              "
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address for newsletter
              </label>

              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setNewsletterMessage("");
                }}
                required
                placeholder="Your email address"
                className="
                  min-w-0 flex-1
                  bg-transparent py-4
                  text-[13px] text-white
                  placeholder:text-white/40
                  outline-none
                "
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="
                  group flex h-11 w-11
                  shrink-0 items-center justify-center
                  text-white
                  transition-colors
                  hover:text-accent
                "
              >
                <ArrowRight
                  size={19}
                  strokeWidth={1.5}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>
            </form>

            {newsletterMessage && (
              <p role="status" className="mt-3 text-[11px] text-white/70">
                {newsletterMessage}
              </p>
            )}

            {/* Optional social links */}
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="
                  flex h-10 w-10 items-center justify-center
                  border border-white/20
                  text-white/70
                  transition-all duration-300
                  hover:border-accent
                  hover:text-accent
                "
              >
                <FaFacebookF size={17} strokeWidth={1.5} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  flex h-10 w-10 items-center justify-center
                  border border-white/20
                  text-white/70
                  transition-all duration-300
                  hover:border-accent
                  hover:text-accent
                "
              >
                <FaInstagram size={17} strokeWidth={1.5} />
              </a>

              <Link
                to="/contact"
                aria-label="Contact A&A Garden Suites"
                className="
                  flex h-10 w-10 items-center justify-center
                  border border-white/20
                  text-white/70
                  transition-all duration-300
                  hover:border-accent
                  hover:text-accent
                "
              >
                <Mail size={17} strokeWidth={1.5} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* FOOTER BOTTOM */}
        <div
          className="
            mt-16 flex flex-col
            gap-5 border-t border-white/15
            pt-6
            text-[10px] text-white/50
            lg:mt-20
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <p className="m-0">
            © {currentYear} A&A Garden Suites. All rights reserved.
          </p>

          <nav
            aria-label="Legal information"
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="
                  transition-colors duration-300
                  hover:text-white
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="m-0">Made with care in the Philippines</p>
        </div>
      </div>
    </footer>
  );
}
