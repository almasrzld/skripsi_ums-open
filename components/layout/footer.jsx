import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  const FOOTERLIST = [
    {
      name: "Beranda",
      path: "/",
    },
    {
      name: "Profil",
      path: "/profil",
    },
    {
      name: "Pendaftaran",
      path: "/pendaftaran",
    },
    {
      name: "Bagan",
      path: "/bagan",
    },
    {
      name: "Kontak",
      path: "/kontak",
    },
    {
      name: "Panduan",
      path: "/panduan-pengguna",
    },
  ];

  return (
    <footer className="w-full bg-[#073252]">
      <div className="container mx-auto py-5">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-white font-bold text-2xl md:text-3xl">
            UMS Open
          </h1>
          <h1 className="text-white italic text-sm md:text-base">
            “Meningkatkan Sportivitas dan Prestasi Atlet”
          </h1>
          <div className="flex justify-center space-x-4">
            {FOOTERLIST.map((item, index) => (
              <div key={index}>
                <a
                  href={item.path}
                  className="text-white text-xs md:text-sm hover:text-[#FF165D] transition-all"
                >
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </div>
        <hr className="w-full border-t border-neutral-200 my-8" />
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left md:px-11">
          <div className="flex items-center mb-4 md:mb-0 md:pr-[75px] text-3xl">
            <h1 className="text-white font-semibold">UMS</h1>
            <div className="text-[#3EC1D3] font-semibold">Open</div>
          </div>
          <div className="text-white mb-4 md:mb-0 text-center">
            <span className="font-bold">©UMS Open</span> All Rights Reserved.
            System Information by Almas Rizaldi
          </div>
          <div className="flex space-x-4">
            <Link href="/" target="_blank">
              <div className="bg-white rounded-full p-2 flex items-center justify-center w-12 h-12">
                <Instagram className="w-6 h-6" />
              </div>
            </Link>
            <Link href="/" target="_blank">
              <div className="bg-white rounded-full p-2 flex items-center justify-center w-12 h-12">
                <Facebook className="w-6 h-6" />
              </div>
            </Link>
            <Link href="/" target="_blank">
              <div className="bg-white rounded-full p-2 flex items-center justify-center w-12 h-12">
                <Twitter className="w-6 h-6" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
