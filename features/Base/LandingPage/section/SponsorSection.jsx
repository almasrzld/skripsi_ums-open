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
              <Image
                className="object-contain"
                src={sponsorImg}
                alt="sponsor img"
                width={150}
                height={150}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default SponsorSection;
