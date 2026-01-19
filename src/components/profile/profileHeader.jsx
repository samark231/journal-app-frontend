import "../../styles/profile/profileHeader.css";
import appLogo from "../../assets/logo/logo_64x64.png";
import { useShallow } from "zustand/shallow";
import useGeneralStore from "../../store/generalStore";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleNavigation = (path)=>{
    navigate(path);
  }

  return (
    <header className='ph-container'>
      <div className={`ph-brand `}>
        <img src={appLogo} alt="Logo" className='ph-logo'  onClick={()=>handleNavigation("/")}/>
        <span className='ph-app-name'>Slate of Mind</span>
      </div>
        <div className="ph-page-name">
            <h2>Profile</h2>
        </div>
    </header>
  );
};

export default Header;