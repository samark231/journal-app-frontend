import React, { useState } from 'react';
import "../styles/header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRightFromBracket, 
  faGear, 
  faSearch, 
  faHeartPulse,
  faXmark 
} from '@fortawesome/free-solid-svg-icons';
import appLogo from "../assets/logo/logo_64x64.png";
import useAuthStore from '../store/authStore';
import useGeneralStore from '../store/generalStore';
import useJournalStore from '../store/JournalStore';

function Header() {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState('idle');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const journalFilter = useJournalStore((state)=> state.journalFilter);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const healthCheck = useGeneralStore((state) => state.healthCheck);
  

  const handleHealthCheck = async () => {
    setStatus('checking');
    try {
      await healthCheck();
      setStatus('online');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (e) {
      setStatus('error');
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    journalFilter(e.target.value);
  }

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <header className='header-container'>
      <div className={`header-brand ${isMobileSearchOpen ? 'hide-on-mobile' : ''}`}>
        <img src={appLogo} alt="Logo" className='header-logo' />
        <span className='header-app-name'>Slate of Mind</span>
      </div>

      {!isMobileSearchOpen && (
        <button 
            className="mobile-search-trigger" 
            onClick={() => setIsMobileSearchOpen(true)}
        >
            <FontAwesomeIcon icon={faSearch} />
        </button>
      )}

        <div className={`header-search ${isMobileSearchOpen ? 'mobile-active' : ''}`}>
          <FontAwesomeIcon icon={faSearch} className="search-icon"/>
          <input 
            type="text" 
            placeholder={`Search ${user.firstName}'s journal...`} 
            className="search-input"
            value={searchText}
            onChange={handleSearch}
            autoFocus={isMobileSearchOpen}
          />
          <button 
            className="mobile-search-close" 
            onClick={() => {
                setIsMobileSearchOpen(false);
                setSearchText(""); // Optional: clear search on close
                filterJournals("");
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

      <div className={`header-actions ${isMobileSearchOpen ? 'hide-on-mobile' : ''}`}>
        <button 
            onClick={handleHealthCheck} 
            className={`action-btn status-btn ${status}`}
            title="Check System Status"
        >
          <FontAwesomeIcon icon={faHeartPulse} />
        </button>
        
        <button className='action-btn' title="Settings">
          <FontAwesomeIcon icon={faGear} />
        </button>
        
        <div className="header-divider"></div>
        
        <div className="user-profile">     
            <div className="avatar" title={user.firstName}>
                {getInitials(user.firstName)}
            </div>
            <button onClick={logout} className='logout-btn' title="Logout">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;