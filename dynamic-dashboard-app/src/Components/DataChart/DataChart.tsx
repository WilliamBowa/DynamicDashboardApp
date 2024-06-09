import React, { useContext } from "react";
import Chart from "chart.js/auto";
import userDataContext from '../../context/userDataContext.ts';
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);


const DataChart = () => {
    const {  userState } = useContext(userDataContext)
    var userDataDetails = userState.UserDetailsApi
    const labels = ["Technology", "Business", "Medical", "Entertainment"];
  
    var businessCount =0
    var technologyCount = 0
    var medicalCount = 0
    var EntertainmentCount = 0
    var totalCountPerField = new Array()
    
    const handleChange = (e) => {
        e.preventDefault();

        if(userDataDetails.length !== 0){
            console.log(userDataDetails)
            for(var res of userDataDetails){
                if(res.Field !== ""){
                    //console.log(res.Field)
                    if(res.Field === "Medical" ){
                        medicalCount = medicalCount + 1
                    }
                    if( res.Field === "Business" ){
                        businessCount = businessCount + 1;
                    }
                    if(res.Field === "Technology" ){
                        technologyCount = technologyCount + 1;
                    }
                    if(res.Field === "Entertainment" ){
                        EntertainmentCount = EntertainmentCount + 1;
                    }
                }
            }
        }
        
        totalCountPerField = [businessCount, technologyCount, medicalCount, EntertainmentCount]
        console.log("count medical", businessCount,technologyCount,medicalCount,EntertainmentCount )
    }

    return (
    <div>
        <button onClick={handleChange}> CLICK</button>
        <hr></hr>
        <Line
            style={{width:"40%", margin: "3% auto"}}
            data={
                {
                    labels: labels,
                    datasets: [
                        {
                            data: totalCountPerField.map(item => item),
                            label: "Technology",
                            borderColor: "blue",
                            backgroundColor: "rgb(255, 100, 0)",
                            fill: true,
                        },
                        // {
                        //     data: [0, 0, 11, 0],
                        //     label: "Technology",
                        //     borderColor: "blue",
                        //     backgroundColor: "rgb(255, 100, 0)",
                        //     fill: true,
                        // },
                    ],
            }}
            options={{
                responsive: true,
                plugins: {
                    legend: {position: "top"},
                }
            }}
        />
    </div>
    );
};
export default DataChart;