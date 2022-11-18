import React from 'react';
import {TouchableOpacity, Image, StyleSheet, Text} from 'react-native';

import Colors from '../styles/Colors';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonIcon: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.white,
  },
});

export const Button = ({onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image
        source={require('../asset/icon/reverse.png')}
        style={styles.buttonIcon}
        resizeMode="contain"
      />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
