"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      submenu: [{ name: "Cek Pembayaran", path: "/pendaftaran/cek-pembayaran" }],
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      } `}
    >
      <nav className="container">
        <div className="flex items-center justify-between py-4">
          <h1
            className={`font-bold text-3xl ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            UMSopen
          </h1>
          <ul className="hidden md:flex items-center gap-8">
            {NAVBAR_ITEMS.map((item) => (
              <li key={item.name} className="relative">
                {item.submenu ? (
                  <DropdownMenu>
                    <div className="flex items-center gap-1">
                      <Link
                        href={item.path}
                        className={`font-semibold text-lg hover:text-[#FF165D] ${
                          pathname === item.path
                            ? "text-[#FF165D]"
                            : isScrolled
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {item.name}
                      </Link>
                      <DropdownMenuTrigger asChild>
                        <button>
                          <ChevronDown
                            className={`w-5 h-5 cursor-pointer ${
                              isScrolled ? "text-black" : "text-white"
                            }`}
                          />
                        </button>
                      </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent align="end">
                      {item.submenu.map((sub) => (
                        <DropdownMenuItem key={sub.name} asChild>
                          <Link
                            href={sub.path}
                            className={`w-full cursor-pointer ${
                              pathname === sub.path ? "text-[#FF165D]" : ""
                            }`}
                          >
                            {sub.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.path}
                    className={`font-semibold text-lg hover:text-[#FF165D] ${
                      pathname === item.path
                        ? "text-[#FF165D]"
                        : isScrolled
                        ? "text-black"
                        : "text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button size="icon">
                  <HamburgerMenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="text-2xl">
                    UMS<span className="text-[#3EC1D3]">open</span>
                  </SheetTitle>
                </SheetHeader>
                <ul className="px-4 space-y-2">
                  {NAVBAR_ITEMS.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`font-semibold py-2 block hover:text-[#FF165D] ${
                          pathname === item.path
                            ? "text-[#FF165D]"
                            : "text-black"
                        }`}
                      >
                        {item.name}
                      </Link>

                      {item.submenu && (
                        <ul className="pl-4 mt-1 space-y-1">
                          {item.submenu.map((subitem) => (
                            <li key={subitem.name}>
                              <Link
                                href={subitem.path}
                                onClick={() => setIsOpen(false)}
                                className={`block text-sm font-medium hover:text-[#FF165D] ${
                                  pathname === subitem.path
                                    ? "text-[#FF165D]"
                                    : "text-black"
                                }`}
                              >
                                {subitem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
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
