import React from 'react';
import InitialState, { userStateType }  from '../state/InitialState.ts';

export type UserContextType = {
    userState: userStateType
    userDataDispatch: any
}

export default React.createContext<UserContextType>({
  userState: InitialState,
  userDataDispatch: () => { }
});
