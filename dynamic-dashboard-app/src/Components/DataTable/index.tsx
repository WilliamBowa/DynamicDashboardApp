import React from 'react';
import getData from "../../Service/getData";
import axios from "axios";

const DataTable = () => {

    const handleClick = async () => {
       
        var url = "https://jsonplaceholder.typicode.com/users";
        
        var res = await axios.get(url);

        if(res.status == 200){
            console.log("success api call")
            console.log(res.data)
          
        }else {console.log("error: ", res)}
        // return getData();
    }
    
    return(
        <>
            <div>
                <h1>DataTable</h1>
                <button onClick={handleClick}> Click</button>
            </div>
        </>
    );

};

export default DataTable; 