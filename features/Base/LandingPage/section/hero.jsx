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
    <section
      id="beranda"
      className="relative max-h-[100vh] h-[100vh] bg-blue-500"
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-4">
        <h1 className="md:text-5xl sm:text-4xl text-3xl text-center font-bold text-white">
          Kejuaraan Taekwondo Tingkat Nasional
        </h1>
        <div className="mx-auto">
          <Link href="/#contact">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button className="rounded-full" size="lg">
                    Selengkapnya
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Menuju ke kontak kami</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
