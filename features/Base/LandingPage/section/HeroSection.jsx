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
          <Image
            src="/images/bg-landingpage-hero.png"
            alt="hero img"
            priority
            width={450}
            height={450}
          />
        </div>
      </div>
      <div className="absolute top-[610px] md:top-[340px] left-[70px] md:left-[440px] bg-[#FF165D] w-10 h-10 rounded-full z-0" />
      <div className="absolute top-[650px] md:top-[470px] left-[270px] md:left-[35px]">
        <div className="flex items-center mt-20 gap-2">
          <div className="w-4 h-4 bg-[#FF9A00] rounded-full" />
          <div className="w-4 h-4 bg-[#FF9A00] rounded-full" />
          <div className="w-4 h-4 bg-[#FF9A00] rounded-full" />
          <div className="w-4 h-4 bg-[#FF9A00] rounded-full" />
          <div className="w-4 h-4 bg-[#FF9A00] rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
