import EditorialHero from "../components/ui/EditorialHero";
import SectionNavigation from "../components/ui/SectionNavigation";

export default function ExplorePage() {
  return (
    <>
      <EditorialHero
        eyebrow="Discover A&A Garden Suites"
        title={
          <>
            Explore beyond
            <br />
            <em className="font-normal italic text-[#E7DDC8]">the garden.</em>
          </>
        }
        description="Discover meaningful experiences, intimate celebrations, and beautiful places to explore around your chosen A&A destination."
        image="/images/explore-hero.webp"
        imageAlt="A&A Garden Suites resort surroundings"
      />
    </>
  );
}
