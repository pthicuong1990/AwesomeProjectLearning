import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppColor from '../../styles/AppColor';

import Color from '../../styles/Colors';
import {AppRegex} from '../../utils/Regex';
import {LoginContext} from './AppContext/LoginContext';
import {CustomInput} from './components/CustomInput';
import {CustomSvgIcon, IconName} from './components/CustomSvgIcon';
import {DialogMessage} from './components/DialogMessage';
import {Loading} from './components/Loading';
import {PrimaryButton} from './components/PrimaryButton';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 16,
    height: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 50,
    color: Color.text,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '500',
  },
  textLink: {
    fontSize: 14,
    color: AppColor.link,
    marginVertical: 10,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 400 / 2,
    alignSelf: 'center',
  },
});

export default ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : AppColor.colorPrimary,
  };

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [errors, setError] = useState({});

  const handlerError = (errorMessage, input) => {
    setError(prevState => ({...prevState, [input]: errorMessage}));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!userName) {
      isValid = false;
      handlerError('Please input email', 'email');
    }
    const isEmailValid =
      userName && userName.toLowerCase().match(AppRegex.email);
    if (!isEmailValid) {
      isValid = false;
      handlerError('Please input valid email', 'email');
    }
    if (!password) {
      isValid = false;
      handlerError('Please input password', 'password');
    }
    return isValid;
  };

  const {userData, verifyLogin} = useContext(LoginContext);
  useEffect(() => {
    console.log('Login Data:', userData);
  });

  const onLoginButtonClick = () => {
    if (!validate()) return;
    verifyLogin(userName, password);
  };

  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (userData.error) {
      setErrorMessage(userData.error.message);
    }
    if (userData.data) {
      console.log('Login Data:', userData);
      navigation.navigate('Verify Otp', {userUuid: userData.data.uuid});
    }
  }, [userData, navigation]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <DialogMessage
        message={errorMessage}
        visible={!!errorMessage}
        onPressOk={() => setErrorMessage(null)}
      />
      <Loading visible={userData && userData.loading} />
      <View style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />

        <View
          style={{
            width: '100%',
            height: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomSvgIcon name={IconName.IcLogo} style={styles.logo} />
        </View>

        <CustomInput
          label="Email Address"
          placeholder="Email"
          textContentType="email-outline"
          onFocus={() => {
            handlerError(null, 'email');
          }}
          value={userName}
          error={errors.email}
          onClearText={() => setUserName('')}
          onChangeText={text => {
            setUserName(text);
          }}
        />
        <CustomInput
          label="Your Password"
          placeholder="password"
          textContentType="lock-outline"
          password
          error={errors.password}
          onFocus={() => {
            handlerError(null, 'password');
          }}
          value={password}
          onClearText={() => setPassword('')}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <PrimaryButton
          title="Login"
          onPress={() => {
            onLoginButtonClick();
          }}
        />
        <Text style={styles.textLink}>Forgot your password?</Text>
      </View>
    </SafeAreaView>
  );
};
