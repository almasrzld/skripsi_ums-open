"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const pathname = usePathname();

  const NAVBAR_ITEMS = [
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
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="container">
        <div className="flex items-center justify-between py-2">
          <h1 className="font-bold text-3xl text-white">UMSopen.</h1>
          <ul className="hidden md:flex items-center gap-5">
            {NAVBAR_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`font-semibold text-lg hover:text-[#FF165D] ${
                    pathname === item.path && item.name !== "Beranda"
                      ? "text-[#FF165D]"
                      : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon">
                  <HamburgerMenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <ul className="mt-2 ml-2">
                  {NAVBAR_ITEMS.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.path}
                        className={`font-semibold py-2 block hover:text-[#FF165D] ${
                          pathname === item.path && item.name !== "Beranda"
                            ? "text-[#FF165D]"
                            : "text-black"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
