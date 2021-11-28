import React from "react";
import "../assets/Sidebar.css";

const Sidebar = ({ setpage }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setpage(1)}>DOSSIERS</li>
        <li onClick={() => setpage(2)}>PARTENAIRES</li>
        <li onClick={() => setpage(3)}>STOCK</li>
        <li onClick={() => setpage(4)}>ATTRIBUTION</li>
      </ul>
    </div>
  );
};

export default Sidebar;
