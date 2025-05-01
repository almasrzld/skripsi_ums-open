import dynamic from "next/dynamic";

export const HeroSection = dynamic(() => import("./HeroSection"));
export const SponsorSection = dynamic(() => import("./SponsorSection"));
export const ProfilSection = dynamic(() => import("./ProfilSection"));
export const BaganSection = dynamic(() => import("./BaganSection"));
export const LokasiSection = dynamic(() => import("./LokasiSection"));
export const FaqSection = dynamic(() => import("./FaqSection"));
