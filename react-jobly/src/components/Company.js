//job or company inspect pages
import React, { useEffect, useState } from "react";
import { Navigate, useParams, useSearchParams} from "react-router-dom";
import JobsList from "./JobsList";
import "./Company.css";
import useList from "../hooks/useList";
import JoblyApi from "../api";


function Company({ items, cantFind, currentUser }) {
  const {handle} = useParams();
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(null);
  const [isLoadingCompany, setIsLoadingCompany] = useState(true);


  // const companies = items.companies;


 
  console.log("company handle from url ", handle);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        console.log("fetching company data from handle")
        const companyData = await JoblyApi.getCompany(handle);
        console.log("returned company data ", companyData)
        setCompany(companyData);
        setJobs(companyData.jobs);
        setIsLoadingCompany(false);
      }
      catch(e) {
        console.error("error fetching company data: ", e);
        setIsLoadingCompany(false);
      }
    };

   fetchCompany();
    
  }, [handle]);



  
  //jobs logic

  // useEffect(() => {
  //   const fetchJobs = async() => {
  //     try {
  //       const jobsData = await JoblyApi.getJobForCompany(handle);
  //       console.log('Jobs data ', jobsData);
  //       setJobs(jobsData);
  //     }
  //     catch (e){
  //       console.log("error fetching jobs for company", e)
  //     }
  //   }; 
  
  //     fetchJobs();
    
  // }, [handle, company]);

  

  

 
 
  // const filteredJobs = jobs.filter(job => job.companyHandle === handle);
  // console.log("filteredjobs " , filteredJobs)
  

  if (isLoadingCompany){

    return ( <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
    );
  }
  
  return (
    <div className="company-details">
      <h1>Company Details</h1>
      <section className="company">
        {/* <img src={item.logo_url} alt={item.name}></img> */}
        <div className="info">
            <h2 style={{textAlign: "center"}}>{company.name}</h2>
            <h3>Employees: {company.numEmployees}</h3>
            <h4>{company.description}</h4>
        </div>
      </section>


        <div className="jobsFromCo">
          
            {/* need to return jobs with company_handle === item.company_handle 
            which is also from the url because that is /companies/company_handle */}
            {jobs.length > 0 ? (
              <JobsList type="jobs" list={jobs} companyHandle={company.handle} currentUser={currentUser}/>
            ) : (
              <p>No Open Positions at This Time</p>
            )}
        </div>
      
  </div>
   
    
  );
}

export default Company;
