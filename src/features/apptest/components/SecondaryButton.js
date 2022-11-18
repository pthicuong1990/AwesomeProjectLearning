import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

import Colors from '../../../styles/Colors';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.textLight,
    fontWeight: '500',
    marginVertical: 10,
  },
});

export const Button = ({onPress, text, props}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
