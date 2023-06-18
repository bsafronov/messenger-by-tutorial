import getConversations from "@/actions/getConversations";
import getUsers from "@/actions/getUsers";
import ConversationList from "@/components/conversations/ConversationList";
import Sidebar from "@/components/sidebar/Sidebar";

interface ConversationsLayoutProps {
  children?: React.ReactNode;
}

export default async function Layout({ children }: ConversationsLayoutProps) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    // @ts-ignore
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
