import React from 'react';
import "./JobsList.css";
import {Link} from "react-router-dom";
import useList from "../hooks/useList";
import Job from './Job';

const JobsList = ({type = "jobs", list = [], companyHandle, currentUser}) => {

    const [items, isLoading] = useList(type);

    const displayJobs = list.length > 0 ? list: items;
    if (isLoading && list.length === 0) {return <p>Loading...</p>}

    return (
        <div className='JobsList'>
            <h1>Explore Open Positions</h1>
            <ul>
                {displayJobs.map(item => (
                    
                        <Job item={item} key={item.id} companyHandle={companyHandle} currentUser={currentUser}/>
                 
                   
                ))}
            </ul>
        </div>
    );
};
export default JobsList;