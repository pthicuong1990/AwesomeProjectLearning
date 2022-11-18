import React, {createContext, useReducer} from 'react';
import {loginApi} from '../api/Api';
import {initState, NetWorkAction, reducer} from './NetWorkReducer';

export const LoginContext = createContext();

const login = (userName, password, loginDispatch) => {
  loginDispatch({
    type: NetWorkAction.GetData,
  });
  loginApi(userName, password)
    .then(response => {
      console.log('response', response);
      loginDispatch({
        type: NetWorkAction.GetDataSuccess,
        data: response.data.data,
      });
    })
    .catch(error => {
      console.log('response', error);
      console.log('Error Data: ', error.response.data.error);

      loginDispatch({
        type: NetWorkAction.GetDataError,
        data: error.response.data.error,
      });
    });
};

export const LoginContextProvider = ({children}) => {
  const [userData, loginDispatch] = useReducer(reducer, initState);
  const verifyLogin = (userName, password) => {
    login(userName, password, loginDispatch);
  };

  const contextValue = {
    userData,
    verifyLogin,
    loginDispatch,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};
