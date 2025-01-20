import { useState } from "react";
import NavBar from "../navbar/navbar";

function Layout() {
  const [openSideBar, setOpenSideBar] = useState(false);
  function toggleSideBar() {
    setOpenSideBar(!openSideBar);
  }
  function handleLogout() {
    localStorage.removeItem("idUser");
    console.log("idUser após logout:", localStorage.getItem("idUser")); 
    window.location.href = "/login";
  }
  return (
    <>
      <NavBar
        statusSideBar={openSideBar}
        toggleSideBar={toggleSideBar}
        title="FlowExpenses"
        handleLogout={handleLogout}
      ></NavBar>
    </>
  );
}
export default Layout;
