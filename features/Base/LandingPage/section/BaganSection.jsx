"use client";

import BaganCard from "@/components/common/bagan-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BaganSection = ({ data }) => {
  return (
    <section className="container py-8">
      <h2 className="text-3xl font-bold">Bagan Peserta</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
        {data.slice(0, 4).map((item, index) => (
          <BaganCard key={index} {...item} />
        ))}
      </div>
      <Button className="cursor-pointer">
        <Link href="/bagan">Selengkapnya</Link>
      </Button>
    </section>
  );
};

export default BaganSection;
