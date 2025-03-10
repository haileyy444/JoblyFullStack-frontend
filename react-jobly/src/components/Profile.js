//job or company inspect pages
import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import Job from "./Job";
import "./Profile.css"

import { Link } from "react-router-dom";

function Profile({currentUser}) {
console.log("profile.js currentuser: ", currentUser);
    
    // view and edit 
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  useEffect(() => {
    if(currentUser && currentUser.username) {
        async function fetchProfile() {
            try {
                const userProfile = await JoblyApi.getUserProfile(currentUser.username);
                console.log("fetched profile ", userProfile);
                setProfile(userProfile);
                setFormData({
                    username: userProfile.username,
                    firstName: userProfile.firstName,
                    lastName: userProfile.lastName,
                    email: userProfile.email
                });
            }
            catch (error) {
                console.error("Error fetching profile data", error)
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchProfile();
      }
      else{
        setIsLoading(false);

      }
     }, [currentUser]);
    
 
    


  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
  }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        console.log("updating profile... sending to api")
        //calling api to update user profile
        const updatedProfile = await JoblyApi.updateUserProfile(formData);
        setIsEditing(false);
        setProfile(updatedProfile);
    }
    catch (error) {
        console.error("Error updating profile: ", error)
    }
  };

  if (isLoading) {
    return <p>Loading...</p>
  }

  if(!profile) {
    return (
        <h2>Please <Link to={"/login"}>Login</Link> or <Link to={"/signup"}>Signup</Link> to view your Profile</h2>
    );
  }
  return (
    <section className="profile">
     
           <h1>{currentUser.username}'s Profile</h1>
            {isEditing ? (
                
                <form onSubmit={handleSubmit} className="profile-edit-form">
                      <h2>Edit Profile Data</h2>
                <label>
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled
                  />
                </label>
                <label>
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
                <button type="submit">Save Changes</button>
              </form>
            ) : (
                <div className="profile-info">
                    <h2>Profile Data</h2>
                    <h3>Username: {profile.username}</h3>
                    <h3>First Name: {profile.firstName}</h3>
                    <h3>Last Name: {profile.lastName}</h3>
                    <h3>Email: {profile.email}</h3>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
         
       
      
 
    </section>
  );
}

export default Profile;
