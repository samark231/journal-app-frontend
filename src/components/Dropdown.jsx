import React from 'react'
import logo from "../assets/logo/logo.png";
import "../styles/dropdown.css"
import { useRef } from 'react';
const Dropdown = () => {
    

  return (
    <div ref={dropdownRef} className='dropdown-container'>
      <section className='dropdown-top'>
        <img src={logo} alt="profile-picture" className='dropdown-profile-pic'/>
        <div className='dropdown-pp-userdetails'>
            <span>username</span>
            <span>Samar Krishna</span>
        </div>
      </section>
      <div className='dropdown-divider'>
      </div>
      <section className='dropdown-links'>
        <div>Edit profile Details</div>
        <div>Change Password</div>
        <div>Admin dashboard</div>
        <div>Log out</div>
      </section>
     </div>
  )
}

export default Dropdown;
