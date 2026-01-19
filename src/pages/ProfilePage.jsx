import React, { useState } from 'react';
import "../styles/profile/profilePage.css";
import ProfileStats from '../components/profile/ProfileStats.jsx';
import ProfileDetails from '../components/profile/detsAndPrefs/ProfileDetails.jsx';
import Header from '../components/home/Header.jsx';

const ProfilePage = () => {
  // State to handle form inputs

  return (
    <div className='pp-container'>
      <Header />
      <div className='pp-main'>
        <ProfileDetails/>
        <ProfileStats/>
      </div>
    </div>
  );
};

export default ProfilePage;