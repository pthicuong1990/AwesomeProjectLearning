import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useReducer, useState} from 'react';
import {
  COUNTRY_SELECTED_UUID_DATA_STORAGE,
  fetchReport,
  loadListCountry,
} from '../api/Api';

import {initState, NetWorkAction, reducer} from './NetWorkReducer';

export const ReportContext = createContext();

const defaultCountryList = [
  {
    name: 'Japan',
    flag: '🇯🇵',
    code: 'jp',
  },
  {
    name: 'New Zealand',
    flag: '🇳🇿',
    code: 'nz',
  },
  {
    name: 'Singapore',
    flag: '🇸🇬',
    code: 'sg',
  },
  {
    name: 'Indonesia',
    flag: '🇮🇩',
    code: 'ind',
  },
  {
    name: 'Phillipines',
    flag: '🇵🇭',
    code: 'ph',
  },
  {
    name: 'Kuwait',
    flag: '🇰🇼',
    code: 'kw',
  },
  {
    name: 'Malaysia',
    flag: '🇲🇾',
    code: 'my',
  },
];

export const saveCountrySelectedUuid = async uuid => {
  if (!uuid) return;
  await AsyncStorage.setItem(COUNTRY_SELECTED_UUID_DATA_STORAGE, uuid);
};

export const getSelectedCountryUuid = async () => {
  const value = await AsyncStorage.getItem(COUNTRY_SELECTED_UUID_DATA_STORAGE);
  console.log('UUID: ', value);
  return value;
};

export const mapToCountry = items => {
  return defaultCountryList.map(country => {
    const countryFromServerData = items.find(item =>
      item.name.toLowerCase().includes(country.name.toLowerCase()),
    );
    console.log('defaultCountryList', countryFromServerData);
    const a = {
      ...country,
      uuid: countryFromServerData.uuid,
      name: countryFromServerData.name,
    };
    return a;
  });
};

export const callApi = dispatch => {
  console.log(`Fetch countryList: call Api`);
  dispatch({
    type: NetWorkAction.GetData,
  });
  loadListCountry()
    .then(response => {
      console.log('response', response.data.data.items);
      const countryList = mapToCountry(response.data.data.items);
      console.log('response countryList', countryList);

      dispatch({
        type: NetWorkAction.GetDataSuccess,
        data: countryList,
      });
    })
    .catch(error => {
      console.log('response', error);
      console.log('Error Data: ', error.response.data.error);

      dispatch({
        type: NetWorkAction.GetDataError,
        data: error.response.data.error,
      });
    });
};

export const fetchReportList = dispatch => {
  console.log(`Fetch Report: call Api`);
  dispatch({
    type: NetWorkAction.GetData,
  });
  fetchReport()
    .then(response => {
      console.log('response Report', response.data.data);
      console.log('response Report', response.data);

      dispatch({
        type: NetWorkAction.GetDataSuccess,
        data: response.data,
      });
    })
    .catch(error => {
      console.log('response', error);
      console.log('Error Data: ', error.response.data.error);

      dispatch({
        type: NetWorkAction.GetDataError,
        data: error.response.data.error,
      });
    });
};

const initCurrentCountry = {
  name: '',
  flag: '',
  code: '',
};

export const ReportContextProvider = ({children}) => {
  const [countryList, countryListDispatch] = useReducer(reducer, initState);
  const [reportData, reportDispatch] = useReducer(reducer, initState);

  useReducer(reducer);

  const [report, setReport] = useState({});
  const [chequeData, setChequeData] = useState({ios: 0, android: 0, web: 0});
  const [currentCountrySelected, setCurrentCountrySelected] =
    useState(initCurrentCountry);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (countryList.error) {
      setErrorMessage(countryList.error.message);
    }
    if (reportData.error) {
      console.log('Fetch Report error:', reportData.error);
      setErrorMessage(reportData.error.message);
    }
  }, [reportData, countryList]);

  useEffect(() => {
    if (countryList.data) {
      const first = countryList
        ? countryList.data.find(() => true)
        : initCurrentCountry;
      setCurrentCountrySelected(first);
    }
  }, [countryList]);

  useEffect(() => {
    if (reportData.data) {
      console.log('Report:', reportData.data);
      setReport(reportData.data);
      console.log('Report mobile_desktop:', reportData.data.mobile_desktop);

      if (reportData.data.mobile_desktop) {
        const newList = {};
        reportData.data.mobile_desktop.forEach(item => {
          console.log('Report Channel:', item);

          const total =
            (newList[item.Channel.toLowerCase()] || 0) +
            Number(item['Total Cheque']);
          newList[item.Channel.toLowerCase()] = total;
        });
        console.log('Report newList cheque:', newList);

        setChequeData(newList);
      }
    }
  }, [reportData]);

  useEffect(() => {
    if (currentCountrySelected && currentCountrySelected.uuid) {
      saveCountrySelectedUuid(currentCountrySelected.uuid);
      console.log('currentCountrySelected :', currentCountrySelected);
      fetchReportList(reportDispatch);
    }
  }, [currentCountrySelected]);

  const fetchListCountry = () => {
    callApi(countryListDispatch);
  };

  const contextValue = {
    countryList,
    currentCountrySelected,
    reportData,
    report,
    errorMessage,
    chequeData,
    setErrorMessage,
    setCurrentCountrySelected,
    fetchListCountry,
    countryListDispatch,
  };

  return (
    <ReportContext.Provider value={contextValue}>
      {children}
    </ReportContext.Provider>
  );
};
