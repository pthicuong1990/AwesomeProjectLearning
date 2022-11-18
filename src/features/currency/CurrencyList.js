import React, {useContext} from 'react';
import {FlatList, StatusBar, View} from 'react-native';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {RowItem, RowSeparator} from '../../components/RowItems';
import Colors from '../../styles/Colors';
import currencies from '../../data/currencies.json';
import IcCheck from '../../asset/icon/checkBoxSelected.svg';
import {ConversionContext} from '../../utils/ConversionContext';

export default ({navigation, route = {}}) => {
  const insets = useSafeAreaFrame;
  const params = route.params || {};
  const {baseCurrency, quoteCurrency, setBaseCurrency, setQouteCurrency} =
    useContext(ConversionContext);
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <FlatList
        data={currencies}
        renderItem={({item}) => {
          let selected = false;
          if (params.isBaseCurrency && item === baseCurrency) {
            selected = true;
          } else if (!params.isBaseCurrency && item === quoteCurrency) {
            selected = true;
          }
          const rightIcon = selected && <IcCheck width={20} height={20} />;
          return (
            <RowItem
              title={item}
              onPress={() => {
                if (params.isBaseCurrency) {
                  setBaseCurrency(item);
                } else {
                  setQouteCurrency(item);
                }
                navigation.pop();
              }}
              rightIcon={rightIcon}
            />
          );
        }}
        keyExtractor={item => item}
        ItemSeparatorComponent={() => <RowSeparator />}
        ListFooterComponent={() => (
          <View style={{paddingBottom: insets.bottom}} />
        )}
      />
    </View>
  );
};
