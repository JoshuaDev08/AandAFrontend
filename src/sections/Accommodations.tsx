import { useState } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, BedDouble, MapPin, Users } from "lucide-react";

import { useLocations, useRooms } from "../hooks/usePublicData";

import type { RoomType } from "../types/public";

type StayFilter =
  | "All Stays"
  | "Couples"
  | "Family"
  | "Groups"
  | "Private Villa";

const filters: StayFilter[] = [
  "All Stays",
  "Couples",
  "Family",
  "Groups",
  "Private Villa",
];

// Optional property classification for future Laravel data.
type DisplayRoom = RoomType & {
  categories?: string[];
  property?: RoomType["property"] & {
    type?: string | null;
  };
};

function matchesFilter(room: DisplayRoom, filter: StayFilter): boolean {
  if (filter === "All Stays") return true;

  const capacity = room.max_occupancy ?? 0;

  switch (filter) {
    case "Couples":
      return capacity >= 2;

    case "Family":
      return (room.max_children ?? 0) > 0;

    case "Groups":
      return capacity >= 6;

    case "Private Villa":
      return (
        room.categories?.includes("private_villa") ||
        room.property?.type === "private_villa"
      );

    default:
      return true;
  }
}

function getRoomImage(room: RoomType): string | null {
  const image = room.images?.[0];

  return image?.url ?? image?.image_url ?? null;
}

function AccommodationCard({
  room,
  locationSlug,
  index,
  reduceMotion,
}: {
  room: RoomType;
  locationSlug: string;
  index: number;
  reduceMotion: boolean | null;
}) {
  const imageUrl = getRoomImage(room);

  const roomUrl =
    `/locations/${encodeURIComponent(locationSlug)}` +
    `/properties/${encodeURIComponent(room.property?.slug ?? "")}` +
    `/rooms/${encodeURIComponent(room.slug)}`;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.65,
        delay: reduceMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group flex h-full flex-col
        bg-base-100
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-[0_20px_45px_rgba(30,44,35,0.10)]
      "
    >
      {/* IMAGE */}
      <Link
        to={roomUrl}
        aria-label={`View ${room.name}`}
        className="
          relative block h-[290px]
          overflow-hidden bg-primary/10
          sm:h-[320px]
        "
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${room.name} accommodation`}
            loading="lazy"
            decoding="async"
            className="
              h-full w-full object-cover
              transition-transform duration-1000
              group-hover:scale-[1.055]
            "
          />
        ) : (
          <div
            className="
              flex h-full items-center
              justify-center text-primary/30
            "
          >
            <BedDouble size={44} strokeWidth={1} />
          </div>
        )}

        <div
          aria-hidden="true"
          className="
            absolute inset-0
            bg-gradient-to-t
            from-primary/30 via-transparent to-transparent
          "
        />

        {room.property?.name && (
          <span
            className="
              absolute bottom-4 left-4
              inline-flex items-center gap-2
              bg-primary px-3 py-2
              text-[9px] font-medium
              tracking-[0.06em] text-primary-content
            "
          >
            <MapPin size={12} />
            {room.property.name}
          </span>
        )}

        <span
          aria-hidden="true"
          className="
            absolute right-4 top-4
            flex h-10 w-10
            items-center justify-center
            bg-base-100/90 text-primary
            transition-transform duration-300
            group-hover:-translate-y-1
            group-hover:translate-x-1
          "
        >
          <ArrowUpRight size={19} strokeWidth={1.5} />
        </span>
      </Link>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-6">
        <p
          className="
            mb-2 text-[9px] font-semibold
            uppercase tracking-[0.15em]
            text-secondary
          "
        >
          A&A Garden Suites
        </p>

        <h3
          className="
            mb-3 font-serif
            text-[clamp(28px,2.5vw,34px)]
            font-normal tracking-[-0.025em]
            text-primary
          "
        >
          {room.name}
        </h3>

        <p
          className="
            mb-5 line-clamp-2 min-h-12
            text-[13px] leading-6
            text-base-content/60
          "
        >
          {room.description ||
            "Explore the comforts and amenities of this accommodation."}
        </p>

        {/* ROOM DETAILS */}
        <div
          className="
            mb-5 flex flex-wrap items-center
            gap-x-5 gap-y-3
            border-y border-primary/10
            py-4 text-[11px]
            text-base-content/65
          "
        >
          <span className="inline-flex items-center gap-2">
            <Users size={15} strokeWidth={1.5} />
            Up to {room.max_occupancy} guests
          </span>

          <span className="inline-flex items-center gap-2">
            <BedDouble size={15} strokeWidth={1.5} />
            {room.property?.name ?? "Accommodation"}
          </span>
        </div>

        {/* FOOTER */}
        <div
          className="
            mt-auto flex items-end
            justify-between gap-4
          "
        >
          <div>
            <span
              className="
                block text-[9px] uppercase
                tracking-[0.1em]
                text-base-content/50
              "
            >
              Nightly rates
            </span>

            <span className="font-serif text-lg text-primary">
              Check dates for rates
            </span>
          </div>

          <Link
            to={roomUrl}
            className="
              group/link inline-flex shrink-0
              items-center gap-2
              text-[10px] font-semibold
              uppercase tracking-[0.1em]
              text-primary
            "
          >
            View Room
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              className="
                transition-transform duration-300
                group-hover/link:translate-x-1
                group-hover/link:-translate-y-1
              "
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function Accommodations() {
  const reduceMotion = useReducedMotion();

  const [filter, setFilter] = useState<StayFilter>("All Stays");

  const [selectedSlug, setSelectedSlug] = useState("");

  const {
    data: locations = [],
    isPending: locationsPending,
    isError: locationsError,
    refetch: refetchLocations,
  } = useLocations();

  // Default to the first available location.
  const activeSlug = locations.some(
    (location) => location.slug === selectedSlug,
  )
    ? selectedSlug
    : (locations[0]?.slug ?? "");

  const {
    data: rooms = [],
    isPending: roomsPending,
    isError: roomsError,
    refetch: refetchRooms,
  } = useRooms(activeSlug);

  const filteredRooms = (rooms as DisplayRoom[]).filter((room) =>
    matchesFilter(room, filter),
  );

  // Homepage preview: show a maximum of 4 rooms.
  const visibleRooms = filteredRooms.slice(0, 4);

  const isLoading = locationsPending || (Boolean(activeSlug) && roomsPending);

  const hasError = locationsError || (Boolean(activeSlug) && roomsError);

  function changeLocation(slug: string) {
    setSelectedSlug(slug);
    setFilter("All Stays");
  }

  return (
    <section
      id="stay"
      aria-labelledby="stays-heading"
      className="
        relative overflow-hidden
        bg-white
        px-6 py-20
        sm:px-10 sm:py-24
        lg:px-[6vw] lg:py-32
      "
    >
      <div className="mx-auto max-w-[1600px]">
        {/* SECTION HEADING */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
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
              Rest, Your Way
            </p>

            <h2
              id="stays-heading"
              className="
                font-serif font-normal
                text-[clamp(42px,5vw,76px)]
                leading-[1.08]
                tracking-[-0.035em]
                text-primary
              "
            >
              Find your <em className="font-normal italic">perfect stay</em>
            </h2>
          </div>

          <p
            className="
              max-w-[410px]
              text-[14px] leading-8
              text-base-content/65
            "
          >
            Spaces designed for couples, families, and unforgettable group
            getaways.
          </p>
        </motion.div>

        {/* LOCATION SELECTOR */}
        {!locationsPending && locations.length > 1 && (
          <div
            className="
              mb-7 flex flex-wrap
              items-center gap-4
            "
          >
            <span
              className="
                inline-flex items-center gap-2
                text-[10px] font-semibold
                uppercase tracking-[0.12em]
                text-primary
              "
            >
              <MapPin size={15} className="text-accent" />
              Destination
            </span>

            <select
              aria-label="Select resort location"
              value={activeSlug}
              onChange={(event) => changeLocation(event.target.value)}
              className="
                select select-bordered
                rounded-none border-primary/20
                bg-base-100 text-[12px]
                focus:outline-primary
              "
            >
              {locations.map((location) => (
                <option key={location.id} value={location.slug}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* FILTER TABS */}
        <div
          role="group"
          aria-label="Filter accommodations"
          className="
            mb-10 flex w-full gap-7
            overflow-x-auto
            border-b border-primary/15
            sm:gap-9
          "
        >
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              className={`
                relative shrink-0
                pb-4 pt-2
                text-[12px]
                transition-colors duration-300
                ${
                  filter === item
                    ? "font-semibold text-primary"
                    : "text-base-content/55 hover:text-primary"
                }
              `}
            >
              {item}

              {filter === item && (
                <motion.span
                  layoutId="stay-filter-underline"
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 32,
                  }}
                  className="
                    absolute bottom-0 left-0
                    h-[2px] w-full
                    bg-primary
                  "
                />
              )}
            </button>
          ))}
        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div
            role="status"
            aria-label="Loading accommodations"
            className="
              grid gap-6
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-base-100">
                <div className="skeleton h-[300px] w-full rounded-none" />
                <div className="space-y-4 p-6">
                  <div className="skeleton h-7 w-3/4 rounded-none" />
                  <div className="skeleton h-16 w-full rounded-none" />
                  <div className="skeleton h-8 w-1/2 rounded-none" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {hasError && !isLoading && (
          <div
            role="alert"
            className="
              border border-primary/10
              bg-base-100 px-8 py-12
              text-center
            "
          >
            <h3 className="font-serif text-2xl text-primary">
              We couldn't load the accommodations.
            </h3>

            <p className="mt-3 text-sm text-base-content/60">
              Please try again.
            </p>

            <button
              type="button"
              onClick={() => {
                if (locationsError) {
                  void refetchLocations();
                } else {
                  void refetchRooms();
                }
              }}
              className="btn btn-primary mt-6 rounded-none"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ROOM GRID */}
        {!isLoading && !hasError && (
          <>
            {visibleRooms.length > 0 ? (
              <div
                className="
                  grid items-stretch gap-6
                  sm:grid-cols-2
                  xl:grid-cols-4
                "
              >
                {visibleRooms.map((room, index) => (
                  <AccommodationCard
                    key={`${activeSlug}-${room.id}`}
                    room={room}
                    locationSlug={activeSlug}
                    index={index}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
            ) : (
              <div
                className="
                  border border-primary/10
                  bg-base-100 px-6 py-14
                  text-center
                "
              >
                <BedDouble
                  size={32}
                  strokeWidth={1.2}
                  className="mx-auto mb-4 text-primary/40"
                />

                <h3 className="font-serif text-2xl text-primary">
                  No accommodations found
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm text-base-content/60">
                  {filter === "Private Villa"
                    ? "Private villas are not yet classified in the resort catalog."
                    : "Try another category or destination."}
                </p>

                {filter !== "All Stays" && (
                  <button
                    type="button"
                    onClick={() => setFilter("All Stays")}
                    className="btn btn-outline btn-primary mt-6 rounded-none"
                  >
                    View All Stays
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* VIEW ALL */}
        <div className="mt-14 flex justify-center">
          <Link
            to="/accommodations"
            className="
              group inline-flex min-h-[54px]
              items-center justify-center gap-7
              border border-primary px-8
              text-[11px] font-semibold
              uppercase tracking-[0.13em]
              text-primary
              transition-colors duration-300
              hover:bg-primary hover:text-white
            "
          >
            View All Accommodations
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
      </div>
    </section>
  );
}
