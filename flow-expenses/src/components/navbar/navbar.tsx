import { useState } from "react";
import "./navbar.css";
import SideBar from "../sidebar/sidebar";
import { TfiAlignJustify } from "react-icons/tfi";

interface NavBarProps{
  title:string
  statusSideBar: boolean; toggleSideBar: () => void; 
  handleLogout: ()=> void;
}
function NavBar({statusSideBar, toggleSideBar, title, handleLogout}: NavBarProps) {
  return (
    <>
    <nav className="navbar">
      <div className="navbar-left">
      <button className="btn-navbar" onClick={toggleSideBar}>
        <div className="user-icon">
        <TfiAlignJustify onClick={toggleSideBar} size={24} />
        </div>
        </button>
        <h1>{title}</h1>
      </div>
    </nav>
    <SideBar isOpen={statusSideBar} toggleSideBar={toggleSideBar} handleLogout={ handleLogout}></SideBar>
    </>
  );
}
export default NavBar;
