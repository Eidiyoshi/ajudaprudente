import EventsGrid from "./components/events-grid";
import Guidance from "./components/guidance";
import HeroSection from "./components/hero-section";
import Newsletter from "./components/newsletter";

export default function Home() {
    return (
        <main>
            <HeroSection />
            <EventsGrid />
            <Guidance />
            <Newsletter />
        </main>
    );
}
