            
 const InitialState = {
    newUserData: {  
        Id: 0,
        Name: "",
        Username: "",
        Email: "",
        Phone: "",
    },
    UserDetailsApi: [] as any,
    isError: "",
    isNewUser: false,
}

export type userStateType = typeof InitialState;

export default InitialState;