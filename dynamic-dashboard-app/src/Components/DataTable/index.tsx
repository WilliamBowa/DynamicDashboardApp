import React, { useCallback, useContext, useEffect, useState } from 'react';
import useDataService from '../../service/UseDataService.ts';
import { userStateType } from '../../state/InitialState.ts';
import userDataContext from '../../context/userDataContext.ts';
//import "./styles.scss";

var data = [
    {
        "Id": 1,
        "Name": "Leanne Graham",
        "Username": "Bret",
        "Website": "hildegard.org"
    },
    {
        "Id": 2,
        "Name": "Ervin Howell",
        "Username": "Antonette",
        "Website": "anastasia.net"
    },
    {
        "Id": 3,
        "Name": "Clementine Bauch",
        "Username": "Samantha",
        "Website": "ramiro.info"
    },
    {
        "Id": 4,
        "Name": "Patricia Lebsack",
        "Username": "Karianne",
        "Website": "kale.biz"
    },
    {
        "Id": 5,
        "Name": "Chelsey Dietrich",
        "Username": "Kamren",
        "Website": "demarco.info"
    },
    {
        "Id": 6,
        "Name": "Mrs. Dennis Schulist",
        "Username": "Leopoldo_Corkery",
        "Website": "ola.org"
    },
    {
        "Id": 7,
        "Name": "Kurtis Weissnat",
        "Username": "Elwyn.Skiles",
        "Website": "elvis.io"
    },
    {
        "Id": 8,
        "Name": "Nicholas Runolfsdottir V",
        "Username": "Maxime_Nienow",
        "Website": "jacynthe.com"
    },
    {
        "Id": 9,
        "Name": "Glenna Reichert",
        "Username": "Delphine",
        "Website": "conrad.com"
    },
    {
        "Id": 10,
        "Name": "Clementina DuBuque",
        "Username": "Moriah.Stanton",
        "Website": "ambrose.net"
    },
    {
        "Id": 11,
        "Name": "WILLIAM BOWA",
        "Username": "william.bowa@alaskaair.com",
        "Email": "william.bowa@alaskaair.com",
        "Phone": ""
    }
]

    type Data = typeof data
    type SortKeys = keyof Data[0]
    type  SortOrder = 'asc' | 'desc';

    function sortData({tableData, sortKey, reverse}: {
        tableData: Data,
        sortKey: SortKey,
        reverse: boolean
    }){
        if(!sortkey) return tableData
        const sortedData = data.sort((a,b) => {
            return a[sortkey] > b[sortkey] ? 1:-1
        })

        if(reverse){
            return sortedData.reverse()
        }

        return sortedData
    }

const DataTable = ({data}:{data: Data}) => {
    const {  userState, userDataDispatch } = useContext(userDataContext)
    var userDataDetails = userState.UserDetailsApi
    var serviceData = useDataService()
    const userInputsEntry = {
        Name: "",
        Username: "",
        Phone: "",
        Website: ""
    }
    const [sortKey, setSortKey] = useState<SortKeys>("id");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

    const sortedData = useCallback(
        () => sortData({tableData:data, sortkey, reverse:sortOrder ==='desc'}),
        [data, sortkey, sortOrder]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Target :", e.target)
       // if(e.target[0].value !== "" && e.target[1].value !== "", e.target[2].value !== "" ){
            const newUserDataDetails: userStateType["newUserData"] = 
            {
                Id: userDataDetails.length,
                Name: e.target[0].value,
                Username: e.target[1].value,
                Email: e.target[2].value,
                Phone: e.target[3].value,
            }
            serviceData.getNewUserData(newUserDataDetails)
        //}
       
        console.log('USERSTATE :', userState)
        console.log("serviceData", serviceData)
    }

    const clearForm = (e: any) => {
        e.target.form[0].value = "";
        e.target.form[1].value = "";
        e.target.form[2].value = "";
        e.target.form[3].value = "";
    }

    return(
        <>
            <div className='dataTable'>
                <table style={{ width: "80%", margin: "2% auto"}}>
                    <caption>Caption here</caption>
                    <thead style={{border: "solid lightgray", background: "rgb(238, 238, 238)"}}>
                        <tr className="dataTablecol">
                            <th className="dataTableTh" >ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>website</th>
                        </tr>
                    </thead>
                    <tbody style={{border: "solid lightgray"}}>
                        {
                            //userDataDetails.map(usr => (
                                sortedData().map(usr => (
                                <tr className="dataTableTd" style={{border: "solid lightgray"}}>
                                    <td key={usr.id} >{usr.Id}</td>
                                    <td key={usr.id}>{usr.Name}</td>
                                    <td key={usr.id}>{usr.Username}</td>
                                    <td key={usr.id}>{usr.Email}</td>
                                    <td key={usr.id}>{usr.Phone}</td>
                                    <td key={usr.id}>{usr.Website}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <hr></hr>
            <div className='formPage container col-sm-6' style={{background: "gray", padding: "4%", margin: "3% auto"}}>
            <form onSubmit={(e) => handleSubmit(e)} className='form'>
                <div className='row col-12'>
                    <div className='row col-12' style={{margin: "2% auto 2%"}}><strong>Add New User</strong></div>
                    <hr></hr>
                    <div className='row col-12 incomeBox'>
                        <div className='col-6' style={{textAlign: "right", marginBottom: "1%"}}>
                            <label htmlFor="annualIncome">Name:</label>
                        </div>
                        <div className='col-6'> 
                            <input required type="text" name="name"/>
                        </div>
                    </div>
                    <div className='row col-12 username' style={{marginBottom: "1%"}}>
                        <div className='col-6' style={{textAlign: "right"}}>
                            <label htmlFor="username">Username :</label>
                        </div>
                        <div className='col-6'>
                            <input required type="text" name="username"/>
                        </div>
                    </div>
                    <div className='row col-12 email' style={{marginBottom: "1%"}}>
                        <div className='col-6' style={{textAlign: "right"}}>
                            <label htmlFor="email">Email Address :</label>
                        </div>
                        <div className='col-6'>
                            <input required type="text" name="email"/>
                        </div>
                    </div>
                </div>
                <br />
                <button type="submit" id="submitForm" style={{background: "blue", color: "white"}}>Submit</button>
                <input type="button" name="clearForm" style={{marginLeft: "2%"}} value="Clear" onClick={clearForm} />
            </form>
        </div>
        </>
    );
};

export default DataTable; 