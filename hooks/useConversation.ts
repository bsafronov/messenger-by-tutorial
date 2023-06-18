import { useParams } from "next/navigation";

export default function useConversation() {
  const params = useParams();

  const conversationId = (() => {
    if (!params?.conversationId) {
      return "";
    }

    return params.conversationId as string;
  })();

  const isOpen = !!conversationId;

  return { conversationId, isOpen };
}
