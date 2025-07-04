"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { apiCall } from "@/utils/helper";
import toast from "react-hot-toast";
import { routes } from "@/constants";
import { ClipLoader } from "react-spinners";
import { ModeToggle } from "../components/toggle";
import { useAppDispatch } from "@/redux/hooks/useSelectorHook";
import { logOut } from "@/redux/features/auth";

const MainNav = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  const [loading, setLoading] = useState<boolean>(false)
  const pathName = usePathname();
  const router = useRouter()
  const dispatch = useAppDispatch()

  const logout = async () => {
    setLoading(true)
      try {
        await apiCall("/api/logout", "GET");
        dispatch(logOut());
        toast.success("logged out")
        router.replace(routes.LOGIN);
      } catch (err) {
        console.error("Logout error:", err);
      }
    };

  const menu = [
    {
      href: routes.DASHBOARD,
      label: "Dashboard",
      active: pathName === routes.DASHBOARD,
    },
    {
      href: routes.CONSULTATIONS,
      label: "Consultations",
      active: pathName === routes.CONSULTATIONS,
    },
    {
      href: routes.OFFICER_HOURS,
      label: "Office Hours",
      active: pathName === routes.OFFICER_HOURS,
    },
    {
      href: routes.MATTERS,
      label: "Matters",
      active: pathName === routes.MATTERS,
    },
    {
      href: routes.DOCUMENTS,
      label: "Documents",
      active: pathName === routes.DOCUMENTS,
    },
    // {
    //   href: routes.LAW_FIRM,
    //   label: "Law Firm",
    //   active: pathName === routes.LAW_FIRM,
    // },
    {
      href: routes.SETTINGS,
      label: "Settings",
      active: pathName === routes.SETTINGS,
    },
  ];

  return (
    <nav className={cn("hidden md:flex items-center space-x-4 lg:space-x-6", className)} {...props}>
    <h1 className="text-2xl font-bold italic">Rafiki</h1>
      {menu.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            item.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
      <div>
        <ModeToggle />
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <Button onClick={logout} className="cursor-pointer">
        {loading ? "logging out..." : "Logout"}
        <ClipLoader loading={loading} color="fff" size={10}/>
        </Button>
      </div>
    </nav>
  );
};

export default MainNav;