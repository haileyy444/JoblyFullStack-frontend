import {useState, useEffect} from "react";
import JoblyApi from "../api";

const useList = (type) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //get companies/jobs
        async function getItems() {
            let resultItems;
            try {
                if (type === "companies") {
            
                    resultItems = await JoblyApi.request('companies');
                resultItems = resultItems.companies || [];
                }
                else if (type === "jobs") {
                    
                    resultItems = await JoblyApi.request('jobs');
                   
                    resultItems = resultItems.jobs || [];

                }
                else {
                    console.log("Error getting result from type");
                    resultItems = [];
                }
                setItems(resultItems);
            
            }
            catch (error){
                console.error("error fetching items: ", error)
                setItems([]);
            }
            finally {
                setIsLoading(false);
            }
        }
       getItems();
    }, [type]);
    return [items, isLoading];
}
export default useList;


