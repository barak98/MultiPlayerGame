import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Navbar({BackToMainFunc}) {
  const [error, setError] = useState();
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      {
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            MultiGame
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link
                className="nav-item nav-link"
                onClick={handleLogout}
                to="/login"
              >
                Logout
              </Link>

              <Link className="nav-item nav-link active" onClick={(e) => (BackToMainFunc(e))} >
                Home <span className="sr-only"> </span>
              </Link>

            </div>
          </div>
        </nav>
      }
    </>
  );
}
