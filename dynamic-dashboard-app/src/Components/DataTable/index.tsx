import React, { useContext, useState } from 'react';
import useDataService from '../../service/UserDataService.ts';
import { userStateType } from '../../state/InitialState.ts';
import userDataContext from '../../context/userDataContext.ts';

const DataTable = () => {

    const { userDataDispatch } = useContext(userDataContext)
    
    let userData = useDataService();
    var userDataDetails = userData.userState.UserDetailsApi
    var userDispatch = userData.userDataDispatch

    // const [tableData, setTableData] = useState<dataType[]>();
    // const [isLoaded, setIsLoaded] = useState(false);

    const handleClick = async () => {
        const newUserDataDetails: userStateType["newUserData"] = 
        {
            Id: "11",
            Name: "john",
            Username: "John Doe",
            Email: "johnDoe@test.test",
            Phone: 485756243673,
            Website: "www.johnDoe.com"
        }

        userData.userDataDispatch({
            type: "setNewUserData",
            value: newUserDataDetails
        })

        console.log('newUserDataDetails :', newUserDataDetails)
        console.log('USERSTATE :', userData.userState)
    }

    return(
        <>
            <div>
                <h1>DataTable</h1>
                <button onClick={handleClick}> Click</button>
            </div>
            <div>
                <table>
                    <caption>Caption here</caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            userDataDetails.map(usr => (
                                <tr >
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
        </>
    );
};

export default DataTable; 