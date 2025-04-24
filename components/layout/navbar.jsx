"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrollShadow, setScrollShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrollShadow(true);
      } else {
        setScrollShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const NAVLIST_LEFT = [
    {
      name: "Beranda",
      path: "#beranda",
    },
    {
      name: "Form",
      path: "#form",
    },
  ];

  const NAVLIST_RIGHT = [
    {
      name: "FAQ",
      path: "#faq",
    },
    {
      name: "Cetak",
      path: "/cetak",
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] backdrop-blur-sm ${
        scrollShadow ? "navbar-scroll-shadow" : ""
      }`}
    >
      <div className="container lg:block hidden">
        <div className="py-2 px-36">
          <div className="flex justify-between items-center">
            <ul className="flex items-center gap-36">
              {NAVLIST_LEFT.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className="text-white hover:text-white/80 transition-all"
                  >
                    <p className="font-bold text-lg navbar-text-shadow">
                      {item.name}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <h1>UMS Open</h1>
            </div>
            <ul className="flex items-center gap-36">
              {NAVLIST_RIGHT.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className="text-white hover:text-white/80 transition-all"
                  >
                    <p className="font-bold text-lg navbar-text-shadow">
                      {item.name}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="py-2 lg:hidden block">
        <div className="flex items-center justify-between container">
          <div className="h-[64px] relative">
            <h1>UMS Open</h1>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="z-[999999]">
              <SheetHeader>
                <SheetTitle>Dinsos Surakarta</SheetTitle>
                <div className="flex flex-col items-start mt-5 gap-4">
                  {NAVLIST_LEFT.map((item, index) => (
                    <a key={index} href={item.path}>
                      <SheetDescription>{item.name}</SheetDescription>
                    </a>
                  ))}
                  {NAVLIST_RIGHT.map((item, index) => (
                    <Link key={index} href={item.path}>
                      <SheetDescription>{item.name}</SheetDescription>
                    </Link>
                  ))}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
