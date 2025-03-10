import  { useState, useEffect } from "react";
import JoblyApi from "../api";

const useQueryState = (setIsLoading, endpoint, currentUser) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        if(!currentUser) return;

        setIsLoading(true);
        async function getItems() {
 
            try{
                let resultItems = await JoblyApi.get(endpoint);
                setItems(resultItems);
            }
            catch (e) {
                console.log("Error fetching data in userQueryState ", e);
            }
          
          setIsLoading(false);
        }
        getItems();
      }, [endpoint, currentUser, setIsLoading]);
    return [items, currentUser]  
}
export default useQueryState;


