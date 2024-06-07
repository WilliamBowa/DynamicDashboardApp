import React from 'react';
import InitialState, { userStateType }  from '../state/InitialState';

export type UserContextType = {
  accountState: userStateType
  userDataDispatch: any
}

export default React.createContext<UserContextType>({
  accountState: InitialState,
  userDataDispatch: () => { }
});
