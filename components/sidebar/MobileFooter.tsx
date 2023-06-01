"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItem";

export default function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 z-40 flex w-full items-center justify-between border-t-[1px] bg-white lg:hidden">
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
          href={route.href}
          label={route.label}
        />
      ))}
    </div>
  );
}
