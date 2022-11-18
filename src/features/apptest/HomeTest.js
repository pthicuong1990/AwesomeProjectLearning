import React, {Node, useContext, useEffect, useState} from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {PieChart} from 'react-native-chart-kit';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppColor from '../../styles/AppColor';
import {ReportContext} from './AppContext/ReportContext';
import {CustomSvgIcon, IconName} from './components/CustomSvgIcon';
import {DialogMessage} from './components/DialogMessage';
import {Loading} from './components/Loading';
import {SelectCountry} from './components/SelectCountry';

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: AppColor.colorOnPrimary,
  },
  boxTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
    color: AppColor.colorOnPrimary,
  },
  Container: {
    paddingTop: 16,
    padding: 8,
    flexDirection: 'column',
    flex: 1,
  },
  selectCountry: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: 80,
    shadowColor: AppColor.colorOnPrimary,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: AppColor.colorPrimary,
    borderColor: AppColor.border,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  box: {
    alignItems: 'center',
    shadowColor: AppColor.colorOnPrimary,
    shadowRadius: 5,
    borderRadius: 5,
    width: '48%',
    elevation: 3,
    padding: 24,
    backgroundColor: AppColor.colorPrimary,
  },
});

const chartConfigs = {
  backgroundColor: '#000000',
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const data = [
  {
    name: 'IOS',
    cheque: 0,
    color: '#67C587',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Android',
    cheque: 0,
    color: '#A9DEBA',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Web',
    cheque: 6,
    color: '#C9EAD4',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];
const mapToChequeData = chequeData => {
  return data.map(item => {
    return {...item, cheque: chequeData[item.name.toLowerCase()]};
  });
};

const HomeTest: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : AppColor.colorPrimary,
  };

  const [isShowListCountry, setShowListCountry] = useState();

  const {
    countryList,
    fetchListCountry,
    reportData,
    report,
    chequeData,
    currentCountrySelected,
    setCurrentCountrySelected,
    errorMessage,
    setErrorMessage,
  } = useContext(ReportContext);

  useEffect(() => {
    if ((!countryList || !countryList.data) && !countryList.loading) {
      fetchListCountry();
    }
  });

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Loading visible={countryList.loading || reportData.loading} />
      <DialogMessage
        message={errorMessage}
        visible={!!errorMessage}
        onPressOk={() => setErrorMessage(null)}
      />
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
        }}>
        <TouchableOpacity
          style={styles.selectCountry}
          onPress={() => setShowListCountry(true)}>
          <Text style={{paddingEnd: 10, flex: 1}}>
            {currentCountrySelected.flag}
          </Text>
          <CustomSvgIcon name={IconName.IcExpandLess} />
        </TouchableOpacity>
      </View>
      {chequeData && (
        <PieChart
          data={mapToChequeData(chequeData)}
          width={400}
          height={200}
          chartConfig={chartConfigs}
          accessor={'cheque'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          margin: 16,
          justifyContent: 'space-between',
        }}>
        <View style={styles.box}>
          <Text style={[styles.boxTitle, {paddingBottom: 10}]}>
            Total Transaction
          </Text>
          <Text style={styles.sectionTitle}>
            {report && report.summary ? report.summary.totalCheque : 0}
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={[styles.boxTitle, {paddingBottom: 10}]}>
            Average Order Value (AOV)
          </Text>
          <Text style={styles.sectionTitle}>
            {report && report.summary ? report.summary.avg : 0}
          </Text>
        </View>
      </View>

      <SelectCountry
        visible={isShowListCountry}
        currentSelected={currentCountrySelected}
        onCountrySelected={country => {
          setCurrentCountrySelected(country);
          setShowListCountry(false);
        }}
      />
    </SafeAreaView>
  );
};

export default HomeTest;
