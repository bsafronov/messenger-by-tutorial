"use client";

import { IRoute } from "@/hooks/useRoutes";
import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps extends IRoute {}

export default function MobileItem({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: MobileItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "group flex w-full justify-center gap-x-3 p-4 text-sm font-semibold leading-6 text-gray-500 hover:bg-gray-50 hover:text-black",
        {
          "bg-gray-200 text-black hover:bg-gray-200": active,
        }
      )}
    >
      <Icon className="h-6 w-6" />
      <span className="sr-only">{label}</span>
    </Link>
  );
}
