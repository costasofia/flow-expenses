
import { FaRegUser, FaHome } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import './sidebar.css'
interface SideBarProps {
  toggleSideBar: () => void;
  isOpen: boolean;
  handleLogout: ()=> void;
}

function SideBar({ toggleSideBar, isOpen,  handleLogout }: SideBarProps) {
  return (
    <>
      {isOpen && (
        <aside>
          <button onClick={toggleSideBar}>x</button>
          <ul>
            <li>
              <FaRegUser /> Perfil
            </li>
            <li>
              <a href="/home">
                <FaHome /> Dashboard
              </a>
            </li>
            <li onClick={handleLogout}><IoMdLogOut />Logout</li>
          </ul>
        </aside>
      )}
    </>
  );
}

export default SideBar;