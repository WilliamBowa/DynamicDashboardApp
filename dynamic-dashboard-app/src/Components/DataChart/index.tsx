import React, { useContext, useEffect } from "react";
import Chart from "chart.js/auto";
import userDataContext from '../../context/userDataContext.ts';
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

const DataChart = () => {
    const {  userState } = useContext(userDataContext)
    var totalCountPerField = userState.totalCountPerField
    const labels = ["Technology", "Business", "Medical", "Entertainment"];

    // const handleChange = (e) => {
    //     e.preventDefault();
    // }

    return (
    <div>
        <hr></hr>
        <Line
            style={{width:"70%", margin: "3% auto", height: "auto"}}
            data={
                {
                    labels: labels,
                    datasets: [
                        {
                            data: [totalCountPerField[0], totalCountPerField[1], totalCountPerField[2], totalCountPerField[3]],
                            label: "fields count per users",
                            borderColor: "blue",
                            backgroundColor: "rgb(255, 100, 0)",
                            fill: true,
                        },
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