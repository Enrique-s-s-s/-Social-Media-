import React from "react";
import { Helmet } from 'react-helmet';
import FormComponent from '../components/FormComponent';
import { updatePassword, updateProfile } from '../services/userService';

function SettingsPage() {
  const handlePasswordSubmit = async (formData) => {
    const token = localStorage.getItem('token');
  
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      if (formData.password) {
        await updatePassword(formData.password, formData.confirmPassword, token);
        alert('Password updated successfully');
      }
    } catch (error) {
      console.error(error);
      alert(error || 'An error occurred while updating your password');
    }
  };

  const handleInfoSubmit = async (formData) => {
    const token = localStorage.getItem('token');
    try {
      await updateProfile(formData, token);
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
      alert(error || 'An error occurred while updating your profile');
    }
  };

  return (
    <>
      <Helmet>
          <title>Settings | ET.NETWORK</title>
          <meta name="description" content="" />
      </Helmet>
      <div className="settings-page mt-5">
        <div className="settings-form mt-5">
          <h4 className="section-title mb-3">Profile Settings</h4>
          <FormComponent
            fields={[
              { name: "username", label: "Username", type: "text", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "bio", label: "Bio", type: "textarea", required: false },
            ]}
            onSubmit={handleInfoSubmit}
            buttonText="Save Profile"
          />
        </div>

        <div className="settings-form">
          <h4 className="section-title mt-4 mb-3">Account Management</h4>
          <FormComponent
            fields={[
              { name: "password", label: "New Password", type: "password", required: false },
              { name: "confirmPassword", label: "Confirm Password", type: "password", required: false },
            ]}
            onSubmit={handlePasswordSubmit}
            buttonText="Change Password"
          />
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
