"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { FullConversationType } from "@/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Avatar from "../Avatar";
import { format } from "date-fns";

interface ConversationBoxProps {
  data: FullConversationType;
  selected: boolean;
}

export default function ConversationBox({
  data,
  selected,
}: ConversationBoxProps) {
  const router = useRouter();
  const otherUser = useOtherUser(data);
  const session = useSession();

  const handleClick = () => {
    router.push(`/conversations/${data.id}`);
  };

  const lastMessage = (() => {
    const messages = data.messages || [];

    if (messages.length === 0) return null;

    return messages[messages.length - 1];
  })();

  const userEmail = session.data?.user?.email;

  const hasSeen = (() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  })();

  const lastMessageText = (() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "Started a conversation";
  })();

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "relative flex w-full cursor-pointer items-center space-x-3 rounded-lg p-3 transition hover:bg-neutral-100",
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="mb-1 flex items-center justify-between">
            <p className="font-medium text-gray-900">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs font-light text-gray-400">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              "truncate text-sm",
              hasSeen ? "text-gray-500" : "font-medium text-black"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
}
