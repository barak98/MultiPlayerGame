import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function DashBoard() {
  const { currentUser } = useAuth();
  const [id, setId] = useState();

  return (
     <>
        <Navbar></Navbar>
        <div style={{ display: "inline" }}>
          <div className="d-flex" style={{ height: "90vh" }}>
           
          </div>
        </div>

    </>
  );
}
