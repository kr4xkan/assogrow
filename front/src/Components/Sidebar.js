import React from "react";
import ReactDOM from "react-dom";
import "../assets/Sidebar.css";
import img from "../assets/burger-menu.svg";

var element;
var trigger;

function onload() {
  element = document.getElementById("wrapper");
  trigger = document.getElementById("menu-toggle"); 
  trigger.addEventListener("click", function (e) {
    e.preventDefault();
    element.classList.toggle("toggled");
  });
}

const Sidebar = () => {
  return (
    <div id="wrapper">
      <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
          <li class="sidebar-brand">
            <img class="rounded" width="75px" src="https://img.le-dictionnaire.com/a-blason.jpg"></img>
            <a href="#">Name </a>
          </li>
          <li>
            <a href="#">Contacts </a>
          </li>
          <li>
            <a href="#">Commandes </a>
          </li>
        </ul>
      </div>
      <div class="page-content-wrapper">
        <div class="container-fluid">
        <a class="btn btn-link" role="button" id="menu-toggle" href="#menu-toggle" onLoad={onload}>
          <img src={img}></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
