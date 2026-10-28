import { useEffect, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  X,
} from "lucide-react";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  title: string;
  location: string;
};

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/gallery/pool.webp",
    alt: "Swimming pool surrounded by tropical greenery",
    title: "The Garden Pool",
    location: "A&A Garden Suites - Tagaytay",
  },
  {
    id: 2,
    src: "/images/gallery/room.webp",
    alt: "Comfortable resort guest suite",
    title: "Thoughtful Stays",
    location: "A&A Garden Suites - Tagaytay",
  },
  {
    id: 3,
    src: "/images/gallery/wedding.webp",
    alt: "Intimate garden wedding celebration",
    title: "Moments Worth Celebrating",
    location: "A&A Garden Suites - Tagaytay",
  },
  {
    id: 4,
    src: "/images/gallery/garden.webp",
    alt: "Lush garden pathways and tropical plants",
    title: "Garden Escapes",
    location: "A&A Garden Suites - Tagaytay",
  },
  {
    id: 5,
    src: "/images/gallery/interior.webp",
    alt: "Warm and inviting resort villa interior",
    title: "Spaces to Unwind",
    location: "A&A Garden Suites - Tagaytay",
  },
];

const galleryLayout = ["lg:row-span-2", "", "", "lg:row-span-2", ""];

export default function Gallery() {
  const reduceMotion = useReducedMotion();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedImage =
    selectedIndex !== null ? galleryImages[selectedIndex] : null;

  const closeLightbox = () => setSelectedIndex(null);

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const showNext = () => {
    setSelectedIndex((current) =>
      current === null ? null : (current + 1) % galleryImages.length,
    );
  };

  // Lightbox keyboard controls and scroll lock.
  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="
        relative overflow-hidden
        bg-primary text-primary-content
        pt-20 sm:pt-24 lg:pt-32
      "
    >
      {/* SECTION HEADER */}
      <div
        className="
          mx-auto flex max-w-[1600px]
          flex-col justify-between gap-7
          px-6 pb-12
          sm:px-10
          lg:flex-row lg:items-end
          lg:px-[6vw] lg:pb-14
        "
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p
            className="
              mb-5 text-[10px] font-semibold
              uppercase tracking-[0.2em]
              text-white/75
            "
          >
            A Glimpse of the Garden
          </p>

          <h2
            id="gallery-heading"
            className="
              m-0 font-serif font-normal
              text-[clamp(46px,5vw,76px)]
              leading-[1.08]
              tracking-[-0.035em]
            "
          >
            Life at <em className="font-normal italic text-[#E7DDC8]">A&A</em>
          </h2>
        </motion.div>

        <Link
          to="/explore#gallery"
          className="
            group inline-flex min-h-[52px]
            w-fit items-center justify-center
            gap-6 border border-white/65
            px-7 text-[10px] font-semibold
            uppercase tracking-[0.13em]
            text-white
            transition-colors duration-300
            hover:border-white
            hover:bg-white hover:text-primary
          "
        >
          Explore Gallery
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
      </div>

      {/* MASONRY GALLERY */}
      <div
        className="
          grid grid-cols-2 gap-2
          sm:grid-cols-3
          lg:h-[720px]
          lg:grid-cols-[1.2fr_0.8fr_1fr]
          lg:grid-rows-2
        "
      >
        {galleryImages.map((image, index) => (
          <motion.button
            key={image.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.65,
              delay: reduceMotion ? 0 : index * 0.08,
            }}
            className={`
              group relative isolate
              min-h-[210px] overflow-hidden
              bg-[#102D25] text-left
              sm:min-h-[280px]
              lg:min-h-0
              ${galleryLayout[index]}
            `}
            aria-label={`View ${image.title} photograph`}
          >
            {/* IMAGE */}
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="
                absolute inset-0 -z-30
                h-full w-full object-cover
                transition-transform duration-1000
                ease-out
                group-hover:scale-[1.06]
                motion-reduce:transition-none
              "
            />

            {/* DARK GRADIENT */}
            <div
              aria-hidden="true"
              className="
                absolute inset-0 -z-20
                bg-gradient-to-t
                from-[#071D16]/65
                via-transparent
                to-transparent
              "
            />

            {/* LOCATION BADGE */}
            <span
              className="
                absolute left-3 top-3
                inline-flex max-w-[calc(100%-24px)]
                items-center gap-1.5
                bg-base-100/95
                px-2.5 py-2
                text-[8px] font-semibold
                uppercase tracking-[0.08em]
                text-primary
                sm:left-4 sm:top-4
                sm:px-3
              "
            >
              <MapPin size={11} className="shrink-0" />
              <span className="truncate">{image.location}</span>
            </span>

            {/* IMAGE LABEL */}
            <span
              className="
                absolute bottom-4 left-4
                right-4 flex items-end
                justify-between gap-3
                text-white
                sm:bottom-6 sm:left-6 sm:right-6
              "
            >
              <span
                className="
                  font-serif text-[20px]
                  leading-tight
                  sm:text-[26px]
                "
              >
                {image.title}
              </span>

              <span
                className="
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  border border-white/65
                  bg-white/10 backdrop-blur-sm
                  transition-all duration-300
                  group-hover:bg-white
                  group-hover:text-primary
                "
              >
                <ArrowUpRight size={17} />
              </span>
            </span>

            {/* HOVER OVERLAY */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-0
                flex items-center justify-center
                bg-primary/35
                opacity-0
                transition-opacity duration-500
                group-hover:opacity-100
                group-focus-visible:opacity-100
              "
            >
              <span
                className="
                  inline-flex items-center gap-3
                  text-[10px] font-semibold
                  uppercase tracking-[0.15em]
                  text-white
                "
              >
                View Photograph
                <ArrowUpRight size={17} />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* IMAGE LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Gallery photograph viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-[100]
              flex items-center justify-center
              bg-[#071D16]/95
              px-4 py-20
              backdrop-blur-xl
              sm:px-10
            "
            onClick={closeLightbox}
          >
            {/* CLOSE */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close gallery"
              className="
                absolute right-5 top-5
                z-20 flex h-11 w-11
                items-center justify-center
                border border-white/30
                text-white
                transition-colors
                hover:bg-white/15
                sm:right-8 sm:top-8
              "
            >
              <X size={22} strokeWidth={1.5} />
            </button>

            {/* PREVIOUS */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous photograph"
              className="
                absolute left-3 top-1/2 z-20
                flex h-11 w-11 -translate-y-1/2
                items-center justify-center
                border border-white/30
                bg-primary/50 text-white
                hover:bg-primary
                sm:left-8
              "
            >
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>

            {/* CURRENT IMAGE */}
            <motion.div
              key={selectedImage.id}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="
                flex w-full max-w-[1200px]
                flex-col items-center
              "
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="
                  max-h-[70vh] w-full
                  object-contain
                "
              />

              <div
                className="
                  mt-5 flex w-full
                  items-center justify-between
                  gap-4 text-white
                "
              >
                <div>
                  <p className="font-serif text-xl sm:text-2xl">
                    {selectedImage.title}
                  </p>

                  <p className="mt-1 text-[11px] text-white/60">
                    {selectedImage.location}
                  </p>
                </div>

                <span className="text-xs text-white/60">
                  {(selectedIndex ?? 0) + 1} / {galleryImages.length}
                </span>
              </div>
            </motion.div>

            {/* NEXT */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next photograph"
              className="
                absolute right-3 top-1/2 z-20
                flex h-11 w-11 -translate-y-1/2
                items-center justify-center
                border border-white/30
                bg-primary/50 text-white
                hover:bg-primary
                sm:right-8
              "
            >
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
