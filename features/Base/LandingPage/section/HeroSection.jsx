import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HeroSection = () => {
  return (
    <section className="relative max-h-[100vh] h-[100vh] bg-[#3EC1D3]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full container">
        <div className="flex justify-between items-center gap-8">
          <div className="flex flex-col gap-6">
            <h1 className="md:text-5xl sm:text-4xl text-3xl font-bold text-white">
              Kejuaraan Taekwondo
            </h1>
            <h1 className="md:text-5xl sm:text-4xl text-3xl font-bold text-white">
              Tingkat Nasional
            </h1>
            <p className="font-light text-white text-lg">
              Sistem Informasi dan Manajemen Kejuaraan Taekwondo di Universitas
              Muhammadiyah Surakarta
            </p>
            <Link href="/pendaftaran">
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button className="cursor-pointer" size="lg">
                      Daftar Kejuaraan
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Daftar Sekarang!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </div>
          <Image
            src="/images/hero.png"
            alt="hero img"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
