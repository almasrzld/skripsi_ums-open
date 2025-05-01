import {
  HeroSection,
  SponsorSection,
  ProfilSection,
  BaganSection,
  LokasiSection,
  FaqSection,
} from "./section";
import { bagandata } from "@/libs/bagan-data";

export default function LandingPageFeature() {
  return (
    <main>
      <HeroSection />
      <SponsorSection />
      <ProfilSection />
      <BaganSection data={bagandata} />
      <LokasiSection />
      <FaqSection />
    </main>
  );
}
