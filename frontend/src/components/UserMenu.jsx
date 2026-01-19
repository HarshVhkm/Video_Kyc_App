import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/UserMenu.css";

const UserMenu = ({ agentName, agentEmail }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  // Close menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handles user logout
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
      });
    } catch (err) {
      console.log("Logout API failed but clearing local storage...");
    }

    // Clear all authentication items
    localStorage.removeItem("token");
    localStorage.removeItem("agtLoginId");
    localStorage.removeItem("otpExpiry");
    localStorage.removeItem("fp_agtLoginId");
    localStorage.removeItem("fp_expiry");

    navigate("/login");
  };

  return (
    <div className="user-menu-wrapper" ref={menuRef}>
      {/* Circle Avatar */}
      <div className="user-avatar" onClick={() => setOpen(!open)}>
        {agentName ? agentName.charAt(0).toUpperCase() : "A"}
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="menu-dropdown">
          <div className="menu-header">
            <strong>{agentName}</strong>
            <p>{agentEmail}</p>
          </div>

          <div
            className="menu-item"
            onClick={() => {
              setOpen(false);
              navigate("/change-password");
            }}
          >
            🔑 Change Password
          </div>

          <div className="menu-item" onClick={handleLogout}>
            🚪 Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
