"use client";

import { IRoute } from "@/hooks/useRoutes";
import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps extends IRoute {}

export default function DesktopItem({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: DesktopItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          "group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 text-gray-500 hover:bg-gray-100 hover:text-black",
          {
            "bg-gray-100 text-black": active,
          }
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}
