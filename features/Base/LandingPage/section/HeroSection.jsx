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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full container z-10">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 md:gap-8">
          <div className="flex flex-col gap-2 md:gap-6">
            <h1 className="md:text-6xl text-3xl font-bold text-white">
              Kejuaraan Taekwondo
            </h1>
            <h1 className="md:text-6xl text-3xl font-bold text-white">
              Tingkat Nasional
            </h1>
            <p className="font-light text-white text-md md:text-lg">
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
          <div className="relative w-60 h-96 md:w-[450px] md:h-[750px] aspect-square">
            <Image
              src="/images/bg-landingpage-hero.png"
              alt="hero img"
              priority
              fill
              sizes="(max-width: 768px) 100vw, 450px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-[64%] md:top-[44%] left-[15%] md:left-[29%] bg-[#FF165D] w-8 md:w-10 h-8 md:h-10 rounded-full z-0" />
      <div className="absolute top-[67%] md:top-[60%] left-[70%] md:left-[2.2%]">
        <div className="flex items-center mt-20 gap-2">
          <div className="w-2 md:w-4 h-2 md:h-4 bg-[#FF9A00] rounded-full" />
          <div className="w-2 md:w-4 h-2 md:h-4 bg-[#FF9A00] rounded-full" />
          <div className="w-2 md:w-4 h-2 md:h-4 bg-[#FF9A00] rounded-full" />
          <div className="w-2 md:w-4 h-2 md:h-4 bg-[#FF9A00] rounded-full" />
          <div className="w-2 md:w-4 h-2 md:h-4 bg-[#FF9A00] rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
