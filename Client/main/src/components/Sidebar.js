import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Converstions from "./Converstions";
import Contacts from "./Contacts";
import NewConverstionModal from "./modals/NewConversationModal";
import NewContactModal from "./modals/NewContactModal";

const CONVERSATIONS_KEY = "conversions";
const CONTACTS_KEY = "contacts";

export default function Sidebar(id) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const converstionsOpen = activeKey === CONVERSATIONS_KEY;

  function closeModal() {
    setModalOpen(false);
  }
  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Converstions />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <Button className="rounded-0" onClick={()=> setModalOpen(true)}>
          New {converstionsOpen ? "Converstion" : "Contact"}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {converstionsOpen ? <NewConverstionModal closeModal={closeModal} /> : <NewContactModal  closeModal={closeModal} />}
      </Modal>
    </div>
  );
}
