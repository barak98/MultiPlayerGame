import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SocketMessage from "../components/SocketMessage";
import ContactsProvider from "../components/context/ContactsProvider";
import ConversationsProvider from "../components/context/ConversationsProvider";

export default function DashBoard() {
  return (
    <>
      <ContactsProvider>
        <ConversationsProvider>
          <Navbar></Navbar>
          <div style={{ display: "inline" }}>
            <div
              className="d-flex"
              style={{ height: "90vh", marginLeft: "80%" }}
            >
              <Sidebar></Sidebar>
            </div>

            <SocketMessage></SocketMessage>
          </div>
        </ConversationsProvider>
      </ContactsProvider>
    </>
  );
}
