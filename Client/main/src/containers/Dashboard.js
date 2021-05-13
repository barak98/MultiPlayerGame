import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SocketMessage from "../components/SocketMessage";
import ContactsProvider from "../components/context/ContactsProvider";
import ConversationsProvider, {
  useConversations,
} from "../components/context/ConversationsProvider";
import OpenConversation from "../components/OpenConversation";
import useLocalStorage from "../components/hooks/useLocalStorage";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import Login from "../components/Login";
import { SocketProvider } from "../components/context/SocketProvider";

export default function DashBoard() {
  const { currentUser } = useAuth();
  const [id, setId] = useState();

  return (
     <>
     <SocketProvider id={currentUser.uid}>
    <ContactsProvider>
      <ConversationsProvider id={currentUser.uid}>
        <Navbar></Navbar>
        <div style={{ display: "inline" }}>
          <div className="d-flex" style={{ height: "90vh" }}>
            <Sidebar />
            <OpenConversation />
          </div>
        </div>
      </ConversationsProvider>
    </ContactsProvider>
    </SocketProvider>
    </>
  );
}
