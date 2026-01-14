import Banner from "@/components/shared/Home/Banner";
import FixedSocialSidebar from "@/components/shared/Home/Contact";
import Heaven from "@/components/shared/Home/Heaven";
import MapSection from "@/components/shared/Home/Map";
import Ourascendance from "@/components/shared/Home/Ourascendance";
import OurPerfections from "@/components/shared/Home/OurPerfections";
import Testimonials from "@/components/shared/Home/Testimonials";
import TheBasisOfOurBeliefs from "@/components/shared/Home/theBasisoFourBeliefs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Banner></Banner>
      <OurPerfections />
      <Ourascendance />
      <TheBasisOfOurBeliefs />
      <Heaven />
      <MapSection />
      <Testimonials />
      <FixedSocialSidebar />
    </div>
  );
}
