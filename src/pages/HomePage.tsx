import Hero from "../sections/Hero";
import BookingBar from "../sections/BookingBar";
import FeaturedLocations from "../sections/FeaturedLocations";
import Introduction from "../sections/Introduction";
import Accommodations from "../sections/Accommodations";
import Collections from "../sections/Collections";
import Experiences from "../sections/Experiences";
import Events from "../sections/Events";
import WeddingFeature from "../sections/WeddingFeature";
import Amenities from "../sections/Amenities";
import Gallery from "../sections/Gallery";
import Reviews from "../sections/Review";
import FinalCTA from "../sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BookingBar />
      <FeaturedLocations />
      <Introduction />
      <Accommodations />
      <Collections />
      <Experiences />
      <Events />
      <WeddingFeature />
      <Amenities />
      <Gallery />
      <Reviews />
      <FinalCTA />
      {/* Next sections will be added here. */}
    </>
  );
}
