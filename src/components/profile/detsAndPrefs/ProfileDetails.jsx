import React, { useState } from 'react';
import useAuthStore from '../../../store/authStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/profile/profilePage.css';
import { GENDER } from '../../../utils/utils';
import useProfileStore from '../../../store/profileStore';

const ProfileDetails = () => {
  const [editProfile, setEditProfile] = useState(false);
  const user = useAuthStore(state => state.user);
  const updateProfile = useProfileStore(state=>state.updateProfile);


  const [formData, setFormData] = useState({
    firstName: user.firstName || "-",
    lastName: user.lastName || "-",
    email: user.email || "-",
    gender: user.gender || "-",
    dob: user.dob || "Not Available"
  });

  const handleToggleEdit = () => {
    setEditProfile((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving to Backend:", formData);
    updateProfile(formData);
    setEditProfile(false);
  };

  return (
    <section className='pp-personal pp-card'>
      <div className="profile-header ">
        <div className="profile-identity">
          <div className="avatar-circle">
            {formData.firstName.charAt(0)}
          </div>
          <span className="username">@{formData.firstName.toLowerCase()}</span>
        </div>
        
        {/* Bulk Edit Toggle Button */}
        <button 
          className={`edit-toggle-btn ${editProfile ? 'cancel' : ''}`} 
          onClick={handleToggleEdit}
        >
          <FontAwesomeIcon icon={editProfile ? faTimes : faPenToSquare} />
          {editProfile ? " Cancel" : " Edit Profile"}
        </button>
      </div>

      <form className="profile-form" onSubmit={handleSave}>
        {/* First Name */}
        <div className="form-group">
          <label>First Name</label>
          {editProfile ? (
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          ) : (
            <span className="read-only-text">{user.firstName}</span>
          )}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name</label>
          {editProfile ? (
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          ) : (
            <span className="read-only-text">{user.lastName}</span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          {editProfile ? (
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          ) : (
            <span className="read-only-text">{user.email}</span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label>Birthday</label>
          {editProfile ? (
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          ) : (
            <span className="read-only-text">{user.dob}</span>
          )}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender</label>
          {editProfile ? (
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value={GENDER.MALE}>Male</option>
              <option value={GENDER.FEMALE}>Female</option>
              <option value={GENDER.NON_BINARY}>Non Binary</option>
              <option value={GENDER.OTHER}>Others</option>
              <option value={GENDER.PREFER_NOT_TO_SAY}>Prefer not saying</option>
            </select>
          ) : (
            <span className="read-only-text" style={{textTransform: 'capitalize'}}>{user.gender}</span>
          )}
        </div>

        {editProfile && (
          <button type="submit" className="save-btn">
            <FontAwesomeIcon icon={faCheck} /> Save Changes
          </button>
        )}
      </form>
    </section>
  );
};

export default ProfileDetails;