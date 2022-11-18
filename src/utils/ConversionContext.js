import React, {createContext, useEffect, useReducer, useState} from 'react';
import {api} from '../api/api';

export const ConversionContext = createContext();
const DEFAULT_BASE_CURRENCY = 'USD';
const DEFAULT_QOUTE_CURRENCY = 'GBP';

const initState = {
  loading: false,
  data: [],
  date: '',
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_DATA_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.data,
        date: action.date,
      };
    case 'GET_DATA_ERROR':
      return {
        ...state,
        loading: false,
        data: [],
        error: action.data,
      };
    default:
      return state;
  }
};

const getRates = (baseCurrency, ratesDispatch) => {
  ratesDispatch({
    type: 'GET_DATA_REQUEST',
  });
  api(`/latest?base=${baseCurrency}`)
    .then(response => {
      console.log('response', response);
      ratesDispatch({
        type: 'GET_DATA_SUCCESS',
        data: response.rates,
        date: response.date,
      });
    })
    .catch(error => {
      ratesDispatch({
        type: 'GET_DATA_ERROR',
        data: error,
      });
    });
};

export const ConversionContextProvider = ({children}) => {
  const [baseCurrency, setBaseCurrency] = useState(DEFAULT_BASE_CURRENCY);
  const [quoteCurrency, setQouteCurrency] = useState(DEFAULT_QOUTE_CURRENCY);

  const [ratesData, ratesDispatch] = useReducer(reducer, initState);

  const swapCurrencies = () => {
    setBaseCurrency(quoteCurrency);
    setQouteCurrency(baseCurrency);
  };

  const contextValue = {
    baseCurrency,
    quoteCurrency,
    swapCurrencies,
    setBaseCurrency,
    setQouteCurrency,
    ratesData,
  };

  useEffect(() => {
    getRates(baseCurrency, ratesDispatch);
  }, [baseCurrency]);
  return (
    <ConversionContext.Provider value={contextValue}>
      {children}
    </ConversionContext.Provider>
  );
};
