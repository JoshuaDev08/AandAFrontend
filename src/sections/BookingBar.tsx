import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  MapPin,
  Minus,
  Plus,
  Users,
} from "lucide-react";
import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";

import { useLocations } from "../hooks/usePublicData";

const fieldClass =
  "flex min-w-0 flex-col justify-center gap-2 " +
  "border-b border-primary/10 px-4 py-4 " +
  "sm:px-5 lg:border-b-0 lg:border-r " +
  "xl:px-5";

const labelClass =
  "flex items-center gap-2 text-[10px] " +
  "font-semibold uppercase tracking-[0.15em] " +
  "text-[#747A75]";

const controlClass =
  "h-9 w-full min-w-0 bg-transparent " +
  "text-[13px] font-medium text-base-content " +
  "outline-none focus-visible:ring-2 " +
  "focus-visible:ring-primary/30";

function Counter({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-base-content/75">{label}</span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-8 w-8 items-center justify-center border border-primary/15 transition-colors hover:bg-base-200 disabled:opacity-30"
        >
          <Minus size={13} />
        </button>

        <span className="w-5 text-center text-sm font-medium">{value}</span>

        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-8 w-8 items-center justify-center border border-primary/15 transition-colors hover:bg-base-200 disabled:opacity-30"
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}

export default function BookingBar() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const { data: locations = [], isPending, isError } = useLocations();

  const today = format(new Date(), "yyyy-MM-dd");

  const [locationId, setLocationId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const [error, setError] = useState("");

  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const totalGuests = adults + children;

  function handleCheckIn(value: string) {
    setCheckIn(value);
    setError("");

    if (value && checkOut && checkOut <= value) {
      setCheckOut(format(addDays(parseISO(value), 1), "yyyy-MM-dd"));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!locationId) {
      setError("Please choose your destination.");
      return;
    }

    if (!checkIn || !checkOut) {
      setError("Please select your travel dates.");
      return;
    }

    const nights = differenceInCalendarDays(
      parseISO(checkOut),
      parseISO(checkIn),
    );

    if (checkIn < today || nights < 1 || nights > 30) {
      setError("Please select a stay of 1 to 30 future nights.");
      return;
    }

    if (adults < 1 || children < 0 || rooms < 1 || rooms > totalGuests) {
      setError("Please review your guest and room counts.");
      return;
    }

    const params = new URLSearchParams({
      location_id: locationId,
      check_in: checkIn,
      check_out: checkOut,
      adults: String(adults),
      children: String(children),
      rooms: String(rooms),
    });

    navigate(`/availability?${params.toString()}`);
  }

  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="
        relative z-20
        bg-base-100
        px-4 py-12
        sm:px-6 sm:py-14
        lg:px-8 lg:py-16
      "
    >
      <div className="mx-auto max-w-[1320px]">
        {/* SECTION INTRODUCTION */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">
              Plan Your Escape
            </p>

            <h2
              id="booking-heading"
              className="
                font-serif text-3xl font-normal
                tracking-[-0.03em] text-primary
                sm:text-4xl
              "
            >
              Find Your Perfect Stay
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-base-content/60">
            Choose your destination, select your dates, and discover available
            accommodations.
          </p>
        </motion.div>

        {/* BOOKING FORM */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative bg-base-100
            shadow-[0_18px_55px_rgba(9,28,22,0.1)]
            ring-1 ring-primary/10
          "
        >
          <form
            onSubmit={handleSubmit}
            aria-label="Search resort availability"
            className="
              grid grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.7fr)_minmax(155px,0.9fr)]
            "
          >
            {/* DESTINATION */}
            <label className={`${fieldClass} col-span-2 lg:col-span-1`}>
              <span className={labelClass}>
                <MapPin size={15} className="text-accent" />
                Destination
              </span>

              <select
                value={locationId}
                onChange={(event) => {
                  setLocationId(event.target.value);
                  setError("");
                }}
                disabled={isPending || isError}
                required
                className={`${controlClass} cursor-pointer`}
              >
                <option value="">
                  {isPending
                    ? "Loading destinations..."
                    : isError
                      ? "Destinations unavailable"
                      : "Choose destination"}
                </option>

                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </label>

            {/* CHECK IN */}
            <label className={fieldClass}>
              <span className={labelClass}>
                <CalendarDays size={15} className="text-accent" />
                Check-in
              </span>

              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(event) => handleCheckIn(event.target.value)}
                required
                className={controlClass}
              />
            </label>

            {/* CHECK OUT */}
            <label className={fieldClass}>
              <span className={labelClass}>
                <CalendarDays size={15} className="text-accent" />
                Check-out
              </span>

              <input
                type="date"
                min={
                  checkIn
                    ? format(addDays(parseISO(checkIn), 1), "yyyy-MM-dd")
                    : format(addDays(new Date(), 1), "yyyy-MM-dd")
                }
                value={checkOut}
                onChange={(event) => {
                  setCheckOut(event.target.value);
                  setError("");
                }}
                required
                className={controlClass}
              />
            </label>

            {/* GUEST PICKER */}
            <div className={`${fieldClass} relative`}>
              <span className={labelClass}>
                <Users size={15} className="text-accent" />
                Guests
              </span>

              <button
                type="button"
                aria-expanded={showGuestPicker}
                aria-controls="booking-guest-picker"
                onClick={() => setShowGuestPicker((value) => !value)}
                className="flex h-9 w-full items-center justify-between text-left text-[13px] font-medium"
              >
                <span>
                  {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"}
                </span>
                <span className="text-xs text-primary/50">Edit</span>
              </button>

              {showGuestPicker && (
                <div
                  id="booking-guest-picker"
                  className="
                    absolute left-0 top-full z-30
                    w-[min(300px,85vw)]
                    border border-primary/10
                    bg-base-100 p-5
                    shadow-[0_16px_40px_rgba(9,28,22,0.14)]
                  "
                >
                  <div className="space-y-5">
                    <Counter
                      label="Adults"
                      value={adults}
                      min={1}
                      max={30}
                      onChange={setAdults}
                    />

                    <Counter
                      label="Children"
                      value={children}
                      min={0}
                      max={30}
                      onChange={setChildren}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowGuestPicker(false)}
                    className="btn btn-primary mt-6 w-full rounded-none text-xs"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* ROOMS */}
            <label className={fieldClass}>
              <span className={labelClass}>
                <BedDouble size={15} className="text-accent" />
                Rooms
              </span>

              <select
                value={rooms}
                onChange={(event) => setRooms(Number(event.target.value))}
                className={`${controlClass} cursor-pointer`}
              >
                {[1, 2, 3, 4, 5, 6].map((count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? "Room" : "Rooms"}
                  </option>
                ))}
              </select>
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isPending || isError || locations.length === 0}
              className="
                group col-span-2 flex min-h-[58px]
                items-center justify-center gap-4
                bg-primary px-6
                text-[10px] font-semibold
                uppercase tracking-[0.13em]
                text-primary-content
                transition-colors duration-300
                hover:bg-[#245746]
                disabled:cursor-not-allowed
                disabled:opacity-60
                lg:col-span-1
                xl:min-h-[90px]
              "
            >
              Check Availability
              <ArrowRight
                size={18}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* FEEDBACK */}
          {(error || isError) && (
            <div
              role="alert"
              className="border-t border-error/20 bg-base-100 px-5 py-3 text-sm text-error"
            >
              {error || "Unable to load destinations. Please try again."}
            </div>
          )}
        </motion.div>

        {/* BOTTOM NOTE */}
        <p className="mt-5 text-center text-[11px] text-base-content/50">
          Discover availability across our resort destinations. No payment
          required to browse.
        </p>
      </div>
    </section>
  );
}
