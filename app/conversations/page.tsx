"use client";

import useConversation from "@/hooks/useConversation";
import EmptyState from "@/components/EmptyState";
import clsx from "clsx";

export default function Page() {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx("h-full lg:block lg:pl-80", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
}
