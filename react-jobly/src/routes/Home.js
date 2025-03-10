import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./Home.css"
import { Link, useNavigate } from "react-router-dom";

function Home({companies, jobs, currentUser}) {
  const navigate = useNavigate();
  return (
    <section className="home"> 
    {currentUser ? (
      <>
        
            <h1>
              Welcome to Jobly {currentUser.username}!
              </h1>
            <h2>All the jobs, in one convient place</h2>
            <div className="loggedIn-options">
              <h3>Explore our Database</h3>
                <button onClick={() => navigate('/companies')}>
                    Companies
                </button>
                <button onClick={() => navigate('/jobs')}>
                    Jobs
                </button>
            </div>
      </>
    ) : (
      <>
  
          <h1>
            Welcome to Jobly!
          </h1>
          <h2>All the jobs, in one convient place</h2>
          <div className="loggedOut-options">
          <button onClick={() => navigate('/login')}>
                   Login
                </button>
                <button onClick={() => navigate('/signup')}>
                    Signup
                </button>


          </div>
           
      </>
    )}
    </section>
  );
}

export default Home;
