"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import {
  Map,
  Users,
  ChartBarStacked,
  Package2,
  LayoutDashboard,
  Edit,
  BookText,
  ChevronDown,
  ChevronRight,
  NotebookText,
  CreditCard,
  Trophy,
  Medal,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useAuthStore from "@/hook/useAuth";
import ActionAdminMenu from "../common/action-admin-menu";

const DashboardWrapper = ({ children }) => {
  const pathname = usePathname();
  const [isOpenSub, setIsOpenSub] = useState({});
  const [data, getUser, logoutHandler] = useAuthStore(
    useShallow((state) => [state.data, state.getUser, state.logoutHandler])
  );
  const toggleOpen = (key) => {
    setIsOpenSub((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    SIDEBAR_ITEM.forEach((item, index) => {
      if (item.children?.some((child) => pathname === child.href)) {
        setIsOpenSub((prev) => ({ ...prev, [index]: true }));
      }
    });
  }, [pathname]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const SIDEBAR_ITEM = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icons: LayoutDashboard,
    },
    {
      title: "Partisipan",
      href: "/dashboard/partisipan",
      icons: Users,
    },
    {
      title: "Kategori",
      href: "/dashboard/kategori",
      icons: ChartBarStacked,
    },
    {
      title: "Bagan Pertandingan",
      href: "/dashboard/bagan-pertandingan",
      icons: Map,
    },
    {
      title: "Update Bagan Pertandingan",
      href: "/dashboard/update-bagan-pertandingan",
      icons: Edit,
    },
    {
      title: "Laporan",
      icons: BookText,
      children: [
        {
          title: "Pendaftaran",
          href: "/dashboard/laporan/pendaftaran",
          icons: NotebookText,
        },
        {
          title: "Pembayaran",
          href: "/dashboard/laporan/pembayaran",
          icons: CreditCard,
        },
        {
          title: "Hasil Pertandingan",
          href: "/dashboard/laporan/hasil-pertandingan",
          icons: Trophy,
        },
        {
          title: "Rekap Juara",
          href: "/dashboard/laporan/rekap-juara",
          icons: Medal,
        },
      ],
    },
  ];

  return (
    <div className="h-screen overflow-hidden">
      <div className="fixed left-0 top-0 z-40 h-screen w-[280px] border-r bg-muted/40">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span>UMS Open</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-4 text-sm font-medium">
            {SIDEBAR_ITEM.map((item, index) =>
              item.children ? (
                <Collapsible
                  key={index}
                  open={!!isOpenSub[index]}
                  onOpenChange={() => toggleOpen(index)}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${
                        item.children.some((child) => pathname === child.href)
                          ? "bg-muted"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <item.icons className="h-4 w-4" />
                      {item.title}
                      <span className="ml-auto">
                        {isOpenSub[index] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </span>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-7 mt-1 space-y-1">
                    {item.children.map((sub, i) => (
                      <Link
                        key={i}
                        href={sub.href}
                        className={`flex items-center gap-2 rounded-lg px-3 py-1 transition-all ${
                          pathname === sub.href
                            ? "bg-muted text-primary"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        <sub.icons className="h-4 w-4" />
                        {sub.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    pathname === item.href
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <item.icons className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>

      <div className="ml-[280px] flex flex-col h-screen">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-end gap-4 border-b bg-muted/40 px-6">
          <div className="flex items-center gap-4">
            <p className="inline-flex">
              <span>UMS Open&nbsp;|&nbsp;</span>
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

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardWrapper;
