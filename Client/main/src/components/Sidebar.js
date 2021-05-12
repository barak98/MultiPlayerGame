import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="wrapper" style={{ width: 'auto' }}>
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Login Users:</h3>
        </div>

        <ul class="list-unstyled components">
          <li>
            <a href="#">Portfolio</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
