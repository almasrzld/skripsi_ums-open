import dynamic from "next/dynamic";

export const HeroSection = dynamic(() => import("./hero"));
export const SponsorSection = dynamic(() => import("./sponsor"));
export const BaganSection = dynamic(() => import("./bagan"));
