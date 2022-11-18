import React, {createContext, useReducer} from 'react';

export const ErrorContext = createContext();
const initState = {
  error: null,
};

const reducer = (state, action) => {
  return {
    ...state,
    data: action,
  };
};

const onError = (errorData, errorDispatch) => {
  errorDispatch({
    type: 'GET_DATA_SUCCESS',
    data: errorData,
  });
};

export const ErrorContextProvider = ({children}) => {
  const [errorData, errorDataDispatch] = useReducer(reducer, initState);

  const contextValue = {
    errorData,
    errorDataDispatch,
  };
  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};
