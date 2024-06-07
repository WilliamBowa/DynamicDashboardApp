import axios from "axios";
import { useEffect, useReducer, useState } from "react";
// import InitialState, {userStateType} from "../state/InitialState";
import InitialState, { userStateType } from "../state/InitialState.ts";

const apiUri = "https://jsonplaceholder.typicode.com/users";

type ActionType =
    | { type: "setUserDetails"; value: typeof InitialState["UserDetailsApi"], id: string}
    | { type: "setNewUserData"; value: typeof InitialState["newUserData"]}
    | { type: "setError"; value: typeof InitialState["Error"] };

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
                Error: action.value,
            };

        default:
            return state;
    }
};

let useDataService = () => {
    let [userState, userDataDispatch] = useReducer(reducer, InitialState);

    const getUserData = async () => {
        try {
            const apiResp = await axios.get(apiUri);
            const userData = apiResp.data

            for (const dataItem of userData) {
                const userDataDetails: userStateType["newUserData"] = 
                {
                    Id: dataItem.id,
                    Name: dataItem.name,
                    Username: dataItem.username,
                    Email: dataItem.email,
                    Phone: dataItem.Phone,
                    Website: dataItem.website
                }

                var userDataItem = userDataDetails
    
                userDataDispatch({
                    type: "setUserDetails",
                    value: userDataItem,
                    id: userDataItem.Id
                  });
            }
          
        }catch(ex: any){
            userDataDispatch({
                type: "setError",
                value: new Error("Error - fetching user data.") as any,
            });
        }
    } 

    useEffect(() => {
        getUserData();
      }, []);

    return {
        userState,
        userDataDispatch
    }
};

export default useDataService;