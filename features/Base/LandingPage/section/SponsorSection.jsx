"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";

const SponsorSection = () => {
  const sponsors = Array(10).fill("/images/sponsor-logo.png");

  return (
    <section>
      <div className="py-8">
        <Marquee>
          {sponsors.map((sponsorImg) => (
            <div className="px-8">
              <div className="relative w-[150px] aspect-square">
                <Image
                  src={sponsorImg}
                  alt="sponsor img"
                  fill
                  sizes="150px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default SponsorSection;
