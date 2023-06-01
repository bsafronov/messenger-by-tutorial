import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import useConversation from "./useConversation";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { signOut } from "next-auth/react";

export interface IRoute {
  label: string;
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

export default function useRoutes() {
  const pathname = usePathname();
  const { isOpen } = useConversation();

  const routes: IRoute[] = [
    {
      label: "Chat",
      href: "/conversations",
      icon: HiChat,
      active: pathname === "/conversations" || isOpen,
    },
    {
      label: "Users",
      href: "/users",
      icon: HiUsers,
      active: pathname === "/users",
    },
    {
      label: "Logout",
      href: "#",
      onClick: () => signOut(),
      icon: HiArrowLeftOnRectangle,
    },
  ];

  return routes;
}
