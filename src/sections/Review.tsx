import { motion, useReducedMotion } from "motion/react";
import { MapPin, Quote, Star, MessageSquareQuote } from "lucide-react";

export type GuestReview = {
  id: number | string;
  guestName: string;
  location: string;
  rating: number;
  comment: string;
  date?: string;
  guestType?: string;
};

type ReviewsProps = {
  reviews?: GuestReview[];
  isLoading?: boolean;
};

function ReviewCard({
  review,
  index,
  reduceMotion,
}: {
  review: GuestReview;
  index: number;
  reduceMotion: boolean | null;
}) {
  const rating = Math.max(0, Math.min(5, Math.round(review.rating)));

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: reduceMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group relative flex h-full flex-col
        bg-base-100 p-7
        ring-1 ring-primary/8
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-[0_20px_45px_rgba(23,61,50,0.08)]
        sm:p-9
      "
    >
      {/* Decorative quote */}
      <Quote
        size={45}
        strokeWidth={1}
        aria-hidden="true"
        className="
          absolute right-7 top-7
          text-primary/10
          transition-colors duration-300
          group-hover:text-accent/30
        "
      />

      {/* LOCATION */}
      <p
        className="
          mb-5 flex items-center gap-2
          text-[9px] font-semibold
          uppercase tracking-[0.14em]
          text-primary
        "
      >
        <MapPin size={13} strokeWidth={1.5} />
        {review.location}
      </p>

      {/* RATING */}
      <div
        className="mb-6 flex items-center gap-1 text-accent"
        role="img"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <Star
            key={starIndex}
            size={15}
            strokeWidth={1.4}
            fill={starIndex < rating ? "currentColor" : "none"}
            className={
              starIndex < rating ? "text-accent" : "text-base-content/20"
            }
            aria-hidden="true"
          />
        ))}
      </div>

      {/* REVIEW */}
      <blockquote
        className="
          mb-9 flex-1
          font-serif text-[clamp(20px,1.8vw,25px)]
          font-normal leading-[1.55]
          text-base-content
        "
      >
        “{review.comment}”
      </blockquote>

      {/* AUTHOR */}
      <div className="border-t border-primary/10 pt-6">
        <p
          className="
            text-[11px] font-semibold
            uppercase tracking-[0.12em]
            text-primary
          "
        >
          {review.guestName}
        </p>

        {(review.guestType || review.date) && (
          <p className="mt-2 text-[11px] text-base-content/50">
            {[review.guestType, review.date].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>

      {/* Bottom gold accent */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0
          h-[2px] origin-left scale-x-0
          bg-accent transition-transform duration-500
          group-hover:scale-x-100
        "
      />
    </motion.article>
  );
}

export default function Reviews({
  reviews = [],
  isLoading = false,
}: ReviewsProps) {
  const reduceMotion = useReducedMotion();

  // Homepage preview: maximum of three guest reviews.
  const visibleReviews = reviews.slice(0, 3);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="
        relative overflow-hidden
        bg-white px-6 py-20
        sm:px-10 sm:py-24
        lg:px-[6vw] lg:py-32
      "
    >
      <div className="mx-auto max-w-[1600px]">
        {/* SECTION HEADING */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-12 flex flex-col
            justify-between gap-6
            lg:flex-row lg:items-end
          "
        >
          <div>
            <p
              className="
                mb-5 text-[10px] font-semibold
                uppercase tracking-[0.2em]
                text-primary
              "
            >
              Words From Our Guests
            </p>

            <h2
              id="reviews-heading"
              className="
                font-serif font-normal
                text-[clamp(42px,5vw,76px)]
                leading-[1.08]
                tracking-[-0.035em]
                text-primary
              "
            >
              Stories worth <em className="font-normal italic">sharing.</em>
            </h2>
          </div>

          <p
            className="
              max-w-[410px]
              text-[14px] leading-8
              text-base-content/65
            "
          >
            Discover what makes a stay at A&A Garden Suites memorable through
            the experiences of our guests.
          </p>
        </motion.div>

        {/* LOADING */}
        {isLoading && (
          <div
            role="status"
            aria-label="Loading guest reviews"
            className="grid gap-5 md:grid-cols-3"
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-base-100 p-9 ring-1 ring-primary/10"
              >
                <div className="skeleton mb-6 h-4 w-1/2 rounded-none" />
                <div className="skeleton mb-8 h-5 w-1/3 rounded-none" />
                <div className="skeleton h-32 w-full rounded-none" />
                <div className="skeleton mt-8 h-5 w-1/2 rounded-none" />
              </div>
            ))}
          </div>
        )}

        {/* REVIEWS GRID */}
        {!isLoading && visibleReviews.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {visibleReviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && visibleReviews.length === 0 && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="
              flex flex-col items-center
              border border-primary/10
              bg-base-100 px-6 py-14
              text-center sm:py-20
            "
          >
            <div
              className="
                mb-6 flex h-16 w-16
                items-center justify-center
                border border-primary/15
                text-primary
              "
            >
              <MessageSquareQuote size={28} strokeWidth={1.3} />
            </div>

            <h3 className="font-serif text-2xl font-normal text-primary">
              Guest Stories Coming Soon
            </h3>

            <p
              className="
                mt-4 max-w-md
                text-[13px] leading-7
                text-base-content/60
              "
            >
              We're preparing a collection of genuine guest experiences to share
              with you.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
