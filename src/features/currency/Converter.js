import {
  StatusBar,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import React, {Node, useContext, useState} from 'react';
import {format} from 'date-fns';
import Colors from '../../styles/Colors';
import {ConversionInput} from '../../components/ConversionIntput';

import {Button} from '../../components/Button';
import {KeyboardSpacer} from '../../components/KeyboardSpacer';
import {ConversionContext} from '../../utils/ConversionContext';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoBackground: {
    width: screen.width / 0.45,
    height: screen.width * 0.45,
  },
  logo: {
    position: 'absolute',
    width: screen.width * 0.25,
    height: screen.width * 0.25,
  },
  textHeader: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
  },
});

const Converter: () => Node = ({navigation}) => {
  const [value, setValue] = useState('100');

  const {baseCurrency, quoteCurrency, swapCurrencies, ratesData} =
    useContext(ConversionContext);
  const conversionRate = ratesData.data[quoteCurrency];

  const [scrollEnabled, setScrollEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blue} />
      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../asset/icon/background.png')}
            style={styles.logoBackground}
            resizeMode="contain"
          />
          <Image
            source={require('../../asset/icon/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.textHeader}>Currency Converter</Text>
        {ratesData.loading ? (
          <ActivityIndicator color={Colors.white} size="large" />
        ) : (
          <>
            <View style={styles.inputContainer}>
              <ConversionInput
                text={baseCurrency}
                value={value}
                onButtonPress={() =>
                  navigation.push('CurrencyList', {
                    title: 'Base Currency',
                    isBaseCurrency: true,
                  })
                }
                keyboardType="numeric"
                onChangeText={text => setValue(text)}
              />
              <ConversionInput
                text={quoteCurrency}
                value={
                  value && `${(parseFloat(value) * conversionRate).toFixed(2)}`
                }
                editable={false}
                onButtonPress={() =>
                  navigation.push('CurrencyList', {
                    title: 'Quote Currency',
                    isBaseCurrency: false,
                  })
                }
              />
            </View>
            <Text style={styles.text}>
              {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${
                ratesData.date &&
                format(new Date(ratesData.date), 'MMM do, yyyy')
              }`}
            </Text>
            <Button
              text="Reverse Currencies"
              onPress={() => swapCurrencies()}
            />
          </>
        )}
        <KeyboardSpacer onToggle={visible => setScrollEnabled(visible)} />
      </ScrollView>
    </View>
  );
};
export default Converter;
