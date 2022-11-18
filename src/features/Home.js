import React, {Node} from 'react';

import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Devider} from '../components/RowItems';
import color from '../styles/Colors';

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  Container: {
    backgroundColor: color.white,
    paddingTop: 16,
    padding: 8,
    flexDirection: 'column',
  },
});

const Home: () => Node = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={styles.sectionTitle}>Home Page</Text>

      <View style={styles.Container}>
        <Button
          title="Test App"
          onPress={() => {
            navigation.push('Login');
          }}
        />
        <Devider />
        <Button
          title="To Do List"
          onPress={() => {
            navigation.push('List Of Task');
          }}
        />
        <Devider />
        <Button
          title="Money Converter"
          onPress={() => {
            navigation.push('Converter');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
