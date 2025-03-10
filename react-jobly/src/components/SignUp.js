import React, { useState } from 'react';
import "./Signup.css"

function SignUp({handleSubmit}) {

  // State to hold form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  // State to handle form submission
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // const { username, password, email, first_name, last_name} = formData;

  //   // // Simple validation (you can replace this with real validation)
  //   // if (!username || !password || !email || !first_name || !last_name) {
  //   //   setError("Please enter all required fields.");
  //   //   return;
  //   // }

  //   // Normally here you would make an API call to authenticate the user
  //   console.log("Submitting form with:", formData);
  //   try {
  //     const response = await JoblyApi.signup(formData);
  //     console.log("Signup sucessful ", response);
  //     navigate('/login');

  //   }
  //   catch (e) {
  //     console.log("rror signing up - signup.js ", e)

  //   }
    

  // };

  return (
    <div className='signup'>
      <h1>Welcome to Jobly</h1>
  
    <div className="signup-container">
      <h2>SignUp</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData);
      }}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
          placeholder='Username'
            type="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
          placeholder='Password'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
          placeholder='First Name'
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
          placeholder='Last Name'
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
          placeholder='Email'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">SignUp</button>
      </form>
    </div>
    </div>
  );
}

export default SignUp;
