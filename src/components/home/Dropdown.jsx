import React from 'react';
import "../../styles/home/dropdown.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserPen, 
  faKey, 
  faChartLine, 
  faRightFromBracket,
  faXmark,
  faShieldHalved
} from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '../../store/authStore';
import useGeneralStore from '../../store/generalStore';
import { useShallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';


const Dropdown = () => {
    const navigate = useNavigate();
    const handleNavigation = (path)=>{
        toggleShowDropdown();
        navigate(path)
    }
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  
  // Get state and toggle function from General Store
  const { showDropdown, toggleShowDropdown, getInitials } = useGeneralStore(useShallow((state) => ({
    showDropdown: state.showDropdown,
    toggleShowDropdown: state.toggleShowDropdown,
    getInitials:state.getInitials
  })));

  // If menu is closed, we can return null OR keep it in DOM for animation. 
  // Keeping it in DOM allows the slide-out animation to finish.
  // We handle visibility via CSS classes.

  return (
    <>
      {/* 1. The Dark Overlay (Background dimmer) */}
      <div 
        className={`dropdown-overlay ${showDropdown ? 'active' : ''}`} 
        onClick={toggleShowDropdown}
      ></div>

      {/* 2. The Sliding Sidebar */}
      <aside className={`dropdown-sidebar ${showDropdown ? 'active' : ''}`}>
        
        {/* Close Button */}
        <button className="sidebar-close-btn" onClick={toggleShowDropdown}>
            <FontAwesomeIcon icon={faXmark} />
        </button>

        {/* Profile Header */}
        <section className='dropdown-top'>
            <div className='dropdown-avatar-large'>
                {getInitials(user?.firstName)}
            </div>
            <div className='dropdown-user-info'>
                <span className="user-name">
                    {user?.firstName} {user?.lastName}
                </span>
                <span className="user-email">
                    {user?.email || "user@slateofmind.com"}
                </span>
            </div>
        </section>

        <div className='dropdown-divider'></div>

        {/* Menu Links */}
        <section className='dropdown-links'>
            <button className="menu-item" onClick={()=>handleNavigation("/profile")}>
                <FontAwesomeIcon icon={faUserPen} className="menu-icon" />
                <span>Profile</span>
            </button>
            
            <button className="menu-item">
                <FontAwesomeIcon icon={faKey} className="menu-icon" />
                <span>Change Password</span>
            </button>
            
            <button className="menu-item">
                <FontAwesomeIcon icon={faChartLine} className="menu-icon" />
                <span>Analytics</span>
            </button>
            
            <button className="menu-item">
                <FontAwesomeIcon icon={faShieldHalved} className="menu-icon" />
                <span>Admin Dashboard</span>
            </button>
        </section>

        {/* Footer / Logout */}
        <div className="dropdown-footer">
            <button className="menu-item logout-item" onClick={() => {
                toggleShowDropdown();
                logout();
            }}>
                <FontAwesomeIcon icon={faRightFromBracket} className="menu-icon" />
                <span>Log Out</span>
            </button>
        </div>

      </aside>
    </>
  )
}

export default Dropdown;