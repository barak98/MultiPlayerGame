import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashBoard() {
  return (
    <>
      <div >
        <Navbar></Navbar>
      </div>
      <div style={{ marginLeft: "90%" }}>
      <Sidebar></Sidebar>
      </div>
      
    </>
  );
}
