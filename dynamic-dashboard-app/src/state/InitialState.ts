            
 const InitialState = {
    newUserData: {  
        Id: "",
        Name: "",
        Username: "",
        Email: "",
        Phone: 0,
        Website: ""
    },
    UserDetailsApi: [] as any,
    Error: { message: null},
    isNewUser: false,
}

export type userStateType = typeof InitialState;

export default InitialState;