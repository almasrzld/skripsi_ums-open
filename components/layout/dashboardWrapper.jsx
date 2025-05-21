"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useShallow } from "zustand/react/shallow";
import { LandPlot, Map, Menu, Package2 } from "lucide-react";

import useAuthStore from "@/hook/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ActionAdminMenu from "../common/action-admin-menu";

const DashboardWrapper = ({ children }) => {
  const pathname = usePathname();

  const [data, getUser, logoutHandler] = useAuthStore(
    useShallow((state) => [state.data, state.getUser, state.logoutHandler])
  );
  const [isActive, setIsActive] = useState("");

  useEffect(() => {
    setIsActive(pathname);
  }, [pathname]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const SIDEBAR_ITEM = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icons: Package2,
    },
    {
      title: "Partisipan",
      href: "/dashboard/partisipan",
      icons: Map,
    },
    {
      title: "Bagan Pertandingan",
      href: "/dashboard/bagan-pertandingan",
      icons: LandPlot,
    },
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span>UMS Open</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {SIDEBAR_ITEM.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive === item.href ? "bg-muted" : ""
                  }`}
                >
                  <item.icons className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 md:justify-end lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">UMS Open</span>
                </Link>
                {SIDEBAR_ITEM.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                      isActive === item.href ? "bg-muted" : ""
                    }`}
                  >
                    <item.icons className="h-5 w-5" />
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4">
            <p className="inline-flex">
              <span className="hidden md:block">UMS Open&nbsp;|&nbsp;</span>
              {data?.data?.username}
            </p>
            <ActionAdminMenu
              data={data}
              logoutHandler={logoutHandler}
              pathName="Homepage"
              pathLink="/"
            />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardWrapper;
