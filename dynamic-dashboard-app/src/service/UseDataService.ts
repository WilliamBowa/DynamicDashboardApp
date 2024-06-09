import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import InitialState, { userStateType } from "../state/InitialState.ts";

const apiUri = "https://jsonplaceholder.typicode.com/users";
type ActionType =
    | { type: "setUserDetails"; value: typeof InitialState["UserDetailsApi"], id: number}
    | { type: "setNewUserData"; value: typeof InitialState["newUserData"]}
    | { type: "setError"; value: typeof InitialState["isError"] };

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
        case "setNewUserData":
            return {
                ...state,
                newUserData: { 
                    ...action.value,
                },
            };

        case "setError":
            return {
                ...state,
                isError: action.value
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

            const FieldsList = ["Technology", "Business", "Medical", "Entertainment"];
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
        } catch(ex: any){
            userDataDispatch({
                type: "setError",
                value: ex,
            });
        }
    } 

    const getNewUserData = async (newUser:userStateType["newUserData"]) => {
        // const FieldsList = ["Technology", "Business", "Medical"];
        // const random = Math.floor(Math.random() * FieldsList.length);
        // const randomField = FieldsList[random]
        
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
    }

    useEffect(() => {
        getUserData();
      }, []);

    return {
        userState,
        userDataDispatch,
        getUserData,
        getNewUserData
    }
};

export default useDataService;