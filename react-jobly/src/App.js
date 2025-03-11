import React, {createContext, useContext, useEffect, useState} from "react";
import {Routes, Route, RouterProvider, useNavigate} from "react-router-dom";
import CompaniesList from "./components/CompaniesList";
import JobsList from "./components/JobsList";
import './App.css';
import NavBar from "./components/NavBar";
import useQueryState from "./hooks/useQueryState";
import Profile from "./components/Profile";
import Home from "./routes/Home";
import Company from "./components/Company";

import SignUp from "./components/SignUp";
import {jwtDecode} from "jwt-decode";
import JoblyApi from "./api";
import LoginForm from "./components/Login";

//create user context - sessions
const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  const [companies] = useQueryState(setIsLoading, "companies", currentUser);
  const [jobs] = useQueryState(setIsLoading, "jobs", currentUser);
  // useEffect triggered by a state change of the woken - 
  // calls backend to get info on the newly-loggedin user and stores as currentUser
  // - Will need to decode token and get paylad with correct username - not with jsonwebtoekn - instead jwt-decode module
  // - Expose current user throughout app with context RouterProvider
  // -useContext for current user info in app component

  useEffect(() => {

    if(token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token ", decoded)
        setCurrentUser(decoded);
        JoblyApi.setToken(token);
      }
      catch (e) {
        console.log("Error decoding token ",token, e);
        setCurrentUser(null)
      }
 
    }
    else {
      setCurrentUser(null);
    }
    setIsLoading(false);
  }, [token]); //run once on component mount

  const handleLogin = async (loginData) => {
    const { username, password} = loginData;

    // Simple validation 
    if (!username || !password) {
      console.log("Please enter all required fields.");
      return;
    }
    try {
      const response = await JoblyApi.login(loginData);
      console.log("response app.js handlelogin", response);
      if(response && response.token) {
        localStorage.setItem("token", response.token);
       
        setToken(response.token);

        const decoded = jwtDecode(response.token);
        setCurrentUser(decoded);
        navigate("/");
      }
      else {
        console.log("Login error: No token recieved")
      } 
    }
    catch(error) {
      console.log("error logging in ", error)
    }

  }
  const handleSignup = async(signupData) => {
    const { username, password, email, firstName, lastName} = signupData;

    // Simple validation 
    if (!username || !password || !email || !firstName || !lastName) {
      console.log("Please enter all required fields.");
      return;
    }

    try{
      const response = await JoblyApi.register(signupData);
      console.log("Revcieved token from signup ", response.token)
     
      if(response.token) {
        localStorage.setItem("token", response.token);
 
        setToken(response.token);
     
        const decoded = jwtDecode(response.token);
        setCurrentUser(decoded);

        setTimeout(() => {
          navigate('/');
        }, 100);
      }
      else {
        console.log("Signup Error with Token - non recieved: Token is ", token);
      }
    
 
    } catch (e) {
      console.log("Error signing up ", e)
    }
    
  }
  const handleLogout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setCurrentUser(null);
    navigate('/');
  }
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  return (
    <UserContext.Provider value={{currentUser, handleLogout}}>

   
   
       <NavBar logout={handleLogout} currentUser={currentUser} />
       <main>
         <Routes>
          {/* if not logged in */}
            {/* default to /login page with button at bottom to create new acccount for new users */}
           {!currentUser ? (
            <>

             <Route path="/login" element={<LoginForm handleSubmit={handleLogin}/>} />
             <Route path="/signup" element={<SignUp handleSubmit={handleSignup}/>} />

            </>
           ) : (
            <>
            {/* only logged in users */}
       
            <Route exact path="/profile" element={<Profile currentUser={currentUser}/>} />

            <Route path="/companies" element={<CompaniesList type="companies" title="Companies"/>} />
            <Route path="/jobs" element={<JobsList type="jobs" title="Jobs" currentUser={currentUser}/>} />
            <Route path="/companies/:handle" element={<Company items={companies} cantFind="/companies" currentUser={currentUser}/>} />
        
            </>

           )} 
            <Route exact path="/" element={<Home currentUser={currentUser}/>} />
            <Route path="*" element={<p style={{ color: "white", textAlign:"center", marginTop: "10%"}}>Hmmm. I can't seem to find the page that you want.</p>} />
      
          </Routes>
       </main>

    </UserContext.Provider>
  );
}

export default App;
