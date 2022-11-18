import React, {useContext} from 'react';

import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Pressable,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import AppColor from '../../../styles/AppColor';
import {ReportContext} from '../AppContext/ReportContext';
import {appStyles} from './AppStyles';
import {CustomSvgIcon, IconName} from './CustomSvgIcon';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  dialogContainer: {
    width: '100%',
    paddingBottom: 50,
    backgroundColor: AppColor.colorPrimary,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    padding: 15,
    color: AppColor.colorOnPrimary,
  },
});

export const CountryView = (item, currentSelected, onCountrySelected) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        paddingEnd: 10,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
        }}
        onPress={() => onCountrySelected(item)}>
        <Text
          style={{
            alignSelf: 'center',
            padding: 10,
            alignContent: 'center',
          }}>
          {item.flag}
        </Text>
        <Text
          style={{
            fontSize: 14,
            padding: 16,
            flex: 1,
            color: AppColor.colorOnPrimary,
          }}>
          {item.name}
        </Text>
        {currentSelected.code === item.code && (
          <CustomSvgIcon
            name={IconName.IcCheckMarkGreen}
            style={{
              padding: 10,
              alignContent: 'center',
            }}
          />
        )}
      </TouchableOpacity>
      <View style={appStyles.divider} />
    </View>
  );
};

export const SelectCountry = ({
  visible = false,
  onCountrySelected = country => {},
}) => {
  const {height, width} = useWindowDimensions();
  const {countryList, currentCountrySelected} = useContext(ReportContext);

  return (
    visible && (
      <SafeAreaView style={[styles.container, {height, width}]}>
        <Pressable
          style={{
            width: '100%',
            height: '100%',
          }}
          onPress={() => onCountrySelected(currentCountrySelected)}
        />
        <View style={styles.dialogContainer}>
          <Text style={styles.title}>Select Country</Text>
          <View style={appStyles.divider} />
          <FlatList
            contentContainerStyle={{paddingBottom: 20}}
            data={countryList.data}
            renderItem={({item}) => {
              return CountryView(
                item,
                currentCountrySelected,
                onCountrySelected,
              );
            }}
            keyExtractor={item => item.code}
          />
        </View>
      </SafeAreaView>
    )
  );
};
