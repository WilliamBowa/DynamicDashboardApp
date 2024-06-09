import React, { MouseEventHandler, useCallback, useContext, useEffect, useState } from 'react';
import useDataService from '../../service/UseDataService.ts';
import { userStateType } from '../../state/InitialState.ts';
import userDataContext from '../../context/userDataContext.ts';
// import "./styles.scss";
    
const DataTable = () => {
    const {  userState, userDataDispatch } = useContext(userDataContext)
    var userDataDetails = userState.UserDetailsApi
    var serviceData = useDataService()
    type Data = typeof userDataDetails
    type SortKeys = keyof Data[0]
    type  SortOrder = 'asc' | 'desc';
    const [sortKey, setSortKey] = useState<SortKeys>("Username");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

    const headers: { key: SortKeys; label: string }[] = [
        { key: "Id", label: "ID" },
        { key: "Name", label: "Names" },
        { key: "Username", label: "Username" },
        { key: "Field", label: "Field" },
        { key: "Phone", label: "Phone" }
      ];
    
    function sortData({tableData, sortKey, reverse}: {
        tableData: Data,
        sortKey: SortKeys,
        reverse: boolean
    }){
        if(!sortKey) return tableData
        const sortedData = userDataDetails.sort((a,b) => {
            return a[sortKey] > b[sortKey] ? 1:-1
        })

        if(reverse){
            return sortedData.reverse()
        }

        return sortedData
    }

    function SortButton({
        sortOrder,
        columnKey,
        sortKey,
        onClick,
      }: {
        sortOrder: SortOrder;
        columnKey: SortKeys;
        sortKey: SortKeys;
        onClick: MouseEventHandler<HTMLButtonElement>;
      }) {
        return (
          <button
            onClick={onClick}
            className={`${
              sortKey === columnKey && sortOrder === "desc"
                ? "sort-button sort-reverse"
                : "sort-button"
            }`}
          >
            ▲
          </button>
        );
      }

    function changeSort(key: SortKeys) {
        setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

        setSortKey(key);
    }

    const sortedData = useCallback(
        () => sortData({tableData:userDataDetails, sortKey, reverse:sortOrder ==='desc'}),
        [userDataDetails, sortKey, sortOrder]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("userState.UserDetailsApi", userState.UserDetailsApi);
        console.log("Form Target :", e.target[3].value)
       // if(e.target[0].value !== "" && e.target[1].value !== "", e.target[2].value !== "" ){
            const newUserDataDetails: userStateType["newUserData"] = 
            {
                Id: userDataDetails.length,
                Name:   e.target[0].value,
                Username: e.target[1].value,
                Phone: e.target[2].value,
                Field: e.target[3].value,
            }
            serviceData.getNewUserData(newUserDataDetails)
        //}
       
        console.log('USERSTATE :', userState)
        console.log("serviceData", serviceData)
        
        // var MedicalField = [{}]
        // var TechnoField = [{}]
        // var Business = [{}]

        // for(var i=0; i<userDataDetails.length;i++){
        //     if(userDataDetails[i].Field === "Medical"){
        //         MedicalField[i] = userDataDetails[i]
        //     }else if(userDataDetails[i].Field === "Technology"){
        //         TechnoField[i] = userDataDetails[i]
        //     }else if(userDataDetails[i].Field === "Business"){
        //         Business[i] = userDataDetails[i]
        //     }
        // }

        // //console.log("MedicalField", userData)
        // console.log("TechnoField", TechnoField)
        // console.log("MedicalField", MedicalField)
        // console.log("Business", Business)
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
                    <tr>
                        {headers.map((row) => {
                            return (
                            <td key={row.key}>
                                {row.label}{" "}
                                <SortButton
                                columnKey={row.key}
                                onClick={() => changeSort(row.key)}
                                {...{
                                    sortOrder,
                                    sortKey,
                                }}
                                />
                            </td>
                            );
                        })}
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
                                    <td key={usr.id}>{usr.Field}</td>
                                    <td key={usr.id}>{usr.Phone}</td>
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
                            <label htmlFor="email">Phone Number :</label>
                        </div>
                        <div className='col-6'>
                            <input required type="text" name="email"/>
                        </div>
                    </div>
                    <div className='row col-12 email' style={{marginBottom: "1%"}}>
                        <div className='col-6' style={{textAlign: "right"}}>
                            <label htmlFor="email">Field:</label>
                        </div>
                        <div className='col-6'>
                            <input required type="text" name="field"/>
                        </div>
                    </div>
                    <div>Pick one of Fields: "Technology", "Business", "Medical", "Entertainment"</div>
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