import Hero from "../sections/Hero";
import BookingBar from "../sections/BookingBar";
import FeaturedLocations from "../sections/FeaturedLocations";
import Introduction from "../sections/Introduction";
// import FeaturedLocations from "../sections/FeaturedLocations";
import Accommodations from "../sections/Accommodations";
import Collections from "../sections/Collections";
// import Experiences from "../sections/Experiences";
// import Events from "../sections/Events";
// import Gallery from "../sections/Gallery";
// import Explore from "../sections/Explore";
// import Testimonials from "../sections/Testimonials";
// import FinalCTA from "../sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BookingBar />
      <FeaturedLocations />
      <Introduction />
      <Accommodations />
      <Collections />
      {/* Next sections will be added here. */}
    </>
  );
}
