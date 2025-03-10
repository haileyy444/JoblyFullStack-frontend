//job or company inspect pages
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams} from "react-router-dom";
import JobsList from "./JobsList";
import "./Job.css"
import JoblyApi from "../api";


function Job({item, companyHandle, currentUser}) {
const handle = companyHandle || item.companyHandle || "N/A";
  const equity = item.equity ? item.equity: "None";
  const salary = item.salary ? item.salary: " N/A";

  const [applied, setApplied] = useState(false);
  const jobId = item.id || item.job_id;


  useEffect(() => {
    async function checkIfApplied() {
      try {
        const user = await JoblyApi.getUserProfile(currentUser.username);
        if (user.applications.includes(jobId)) {
          setApplied(true) ;

        }

      }catch (e) {
        console.log("error fetching applied jobs", e)
      }
    }
    checkIfApplied();
  }, [currentUser.username, jobId])


  const handleApply = async() => {
    try {
      await JoblyApi.applyToJob(currentUser.username, jobId);
      setApplied(true);
    } catch (e) {
      console.log("error applying to job", e);
  }

   
  }
  return (
    <div className='job' >
        <div className='info' >
          {/* <img src={item.logo_url} alt={item.company_handle}></img> */}
          <h2>
           {item.title}
          </h2>
                      
            <p>Company: 
                  <Link to={`/companies/${handle}`} className='title'>
                    {handle} 
                  </Link>
            </p>
            <p>Salary: ${salary}</p>
            <p>Equity: {equity}</p>
        
        </div>
        <button 
          onClick={handleApply} 
          disabled={applied} 
          style={{
              backgroundColor: applied ? "#a0c4ff" : "#007bff",
              color: "white",
              cursor: applied ? "not-allowed" : "pointer",
              opacity: applied ? 0.7 : 1,
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}> 
        {applied ? "Applied" : "Apply"}</button>

    </div>
  );
}

export default Job;
