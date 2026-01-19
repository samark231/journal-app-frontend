import React, { useState } from 'react';
import ProfileHeader from "../components/profile/profileHeader.jsx";
import "../styles/profile/profilePage.css";
import ProfileStats from '../components/profile/ProfileStats.jsx';
import ProfileDetails from '../components/profile/detsAndPrefs/ProfileDetails.jsx';

const ProfilePage = () => {
  // State to handle form inputs

  return (
    <div className='pp-container'>
      <ProfileHeader />
      <div className='pp-main'>
        <ProfileDetails/>
        <ProfileStats/>
      </div>
    </div>
  );
};

export default ProfilePage;