import { Button } from "@/components/ui/button";
import Link from "next/link";

const LokasiSection = () => {
  return (
    <section className="container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Lokasi Pertandingan</h2>
        <Button className="cursor-pointer">
          <Link href="/kontak">Selengkapnya</Link>
        </Button>
      </div>
      <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4066.457052328288!2d110.7693499715107!3d-7.546644920152816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a159b81c99937%3A0xbc86d3085f357d67!2sGedung%20Edutorium%20KH.%20Ahmad%20Dahlan%20UMS%20%E2%80%94%20Universitas%20Muhammadiyah%20Surakarta!5e0!3m2!1sid!2sid!4v1746014558466!5m2!1sid!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};

export default LokasiSection;
