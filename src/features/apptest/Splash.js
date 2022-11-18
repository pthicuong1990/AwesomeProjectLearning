import React, {Node, useEffect, useState} from 'react';

import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTodos} from '../../reducers/TodoSlice';
import color from '../../styles/Colors';
import todoColor from '../../styles/todoColor';
import {isLoadingSelector, isLoginSelector} from './redux/loginSelector';
import {getToken, getUser, isUserLoggedIn} from './redux/loginSlice';

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
const imageUrl =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfXGaXUHGyF-jLSe_jqEgMwSIbSzkSm6_ekw&usqp=CAU';

const Splash: () => Node = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const dispatch = useDispatch();

  console.log('dispatch getToken: ');
  useEffect(() => {
    dispatch(isUserLoggedIn());
    dispatch(getUser());
  });

  const loading = useSelector(isLoadingSelector);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{...backgroundStyle, flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 400 / 2,
          }}
        />

        {loading ? (
          <ActivityIndicator color={todoColor.greenColor} size="large" />
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Splash;
