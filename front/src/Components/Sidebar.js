import React from "react";
import "../assets/Sidebar.css";

const Sidebar = ({ setpage, active }) => {
  return (
    <div className="sidebar">
      <ul>
        <li className={(active === 1) && "active"} onClick={() => setpage(1)}>DOSSIERS</li>
        <li className={(active === 2) && "active"} onClick={() => setpage(2)}>PARTENAIRES</li>
        <li className={(active === 3) && "active"} onClick={() => setpage(3)}>STOCK</li>
        <li className={(active === 4) && "active"} onClick={() => setpage(4)}>ATTRIBUTION</li>
      </ul>
    </div>
  );
};

export default Sidebar;
