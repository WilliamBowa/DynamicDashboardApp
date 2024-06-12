import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import InitialState, { userStateType } from "../state/InitialState.ts";

const apiUri = "https://jsonplaceholder.typicode.com/users";
type ActionType =
    | { type: "setUserDetails"; value: typeof InitialState["UserDetailsApi"], id: number}
    | { type: "setCountPerField"; value: typeof InitialState["totalCountPerField"]}
    | { type: "setError"; value: typeof InitialState["isError"] }
    | { type: "setIsNewUser"; value: typeof InitialState["isNewUser"] };

const reducer = (
    state: userStateType,
    action: ActionType
): userStateType => {
    if(typeof state === undefined){
        return state;
    }
    switch (action.type){
        case "setUserDetails": { 
            state.UserDetailsApi[action.id] = {
                ...state.UserDetailsApi[action.id],
                ...action.value,
            }
            return {
                ...state,
            }
        };
        case "setCountPerField":
            return {
                ...state,
                totalCountPerField: [ 
                    ...action.value,
                ],
            };

        case "setError":
            return {
                ...state,
                isError: action.value
            };

        case "setIsNewUser":
            return {
                ...state,
                isNewUser: action.value
            };

        default:
            return state;
    }
};

let useDataService = () => {
    let [userState, userDataDispatch] = useReducer(reducer, InitialState);
    const getUserData = async () => {
        try {
            const { data } = await axios.get(apiUri);

            const FieldsList = ["Technology", "Business", "Medical", "entertainment"];
            const random = Math.floor(Math.random() * FieldsList.length);
            const randomField = FieldsList[random]

            for (const dataItem of data) {
                const userDataDetails: userStateType["newUserData"] = 
                {
                    Id: dataItem.id,
                    Name: dataItem.name,
                    Username: dataItem.username,
                    Field: randomField,
                    Phone: dataItem.Phone,
                }

                var userDataItem = userDataDetails
    
                userDataDispatch({
                    type: "setUserDetails",
                    value: userDataItem,
                    id: userDataItem.Id
                  });     
            }

            getFieldCount()

        } catch(ex: any){
            userDataDispatch({
                type: "setError",
                value: ex,
            });
        }
    } 

    const getNewUserData = async (newUser:userStateType["newUserData"]) => {
        const newUserDataDetails: userStateType["newUserData"] = 
        {
            Id: newUser.Id,
            Name: newUser.Name,
            Username: newUser.Username,
            Field: newUser.Field,
            Phone: newUser.Phone,
        }

        var userDataItem = newUserDataDetails

        userDataDispatch({
            type: "setUserDetails",
            value: userDataItem,
            id: userDataItem.Id
        });  
       
        getFieldCount()
    }

    const getFieldCount = () => {
        var userData = userState.UserDetailsApi
        var businessCount =0
        var technologyCount =0
        var medicalCount =0
        var entertainment =0
       
       userData.map(res => 
        {
            if(res.Field === "Medical" ){
                medicalCount = medicalCount + 1
            }
            else if( res.Field === "Business" ){
                businessCount = businessCount +1;
            }
            else if(res.Field === "Technology" ){
                technologyCount = technologyCount + 1;
            }
            else if(res.Field === "entertainment" ){
                entertainment  = entertainment + 1;
            }
        })

        var totalCountPerField = [technologyCount, businessCount, medicalCount, entertainment]
        userDataDispatch({
            type: "setCountPerField",
            value: totalCountPerField,
        });
    }

    useEffect(() => {
        getUserData();
        getFieldCount();
      }, []);

    return {
        userState,
        userDataDispatch,
        getUserData,
        getNewUserData,
        getFieldCount
    }
};

export default useDataService;