import React, { useState } from 'react';
import './CompaniesList.css'
import {Link} from "react-router-dom";
import useList from "../hooks/useList";



const CompaniesList = ({type = "companies"}) => {

    const [items, isLoading] = useList(type);

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value) ;
    };
    const filteredItems = items.filter((item) => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    if (isLoading) {
        return (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        );
      }
      

    return (
        <div className='CompaniesList'>
            <h1>Explore Companies</h1>
            {/* filter search box for comapnies list - backend endpoint - filter on backend */}
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder='Search Companies'
                        value={searchQuery}
                        onChange={handleSearchChange} 
                        />
                </div>
            <ul>
                {filteredItems.map(item => (
                    <div key={item.handle} className='company'  >
                        {/* <Link to={`/${type}/${item.handle}`} className='logo'>
                             <img src={item.logo_url} alt={item.name}></img>
                        </Link> */}
                   
                        <div className='info'>
                           
                            <Link to={`/companies/${item.handle}`} className='title'>
                                        {item.name}
                            </Link>
                        
                            <p>{item.description}</p>
                        </div>
               
                    </div>
                   
                    
                ))}
            </ul>
        </div>
    );
};
export default CompaniesList;