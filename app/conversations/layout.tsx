import getConversations from "@/actions/getConversations";
import ConversationList from "@/components/conversations/ConversationList";
import Sidebar from "@/components/sidebar/Sidebar";

interface ConversationsLayoutProps {
  children?: React.ReactNode;
}

export default async function Layout({ children }: ConversationsLayoutProps) {
  const conversations = await getConversations();

  return (
    // @ts-ignore
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
