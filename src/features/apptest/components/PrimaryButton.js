import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import AppColor from '../../../styles/AppColor';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '100%',
    height: 48,
    backgroundColor: AppColor.colorPrimaryContainer,
  },
  buttonText: {
    fontSize: 16,
    color: AppColor.colorOnPrimaryContainer,
    fontWeight: '500',
  },

  buttonDisable: {
    backgroundColor: AppColor.colorContainer,
  },
  textDisable: {
    color: AppColor.colorOnContainer,
  },
});

export const PrimaryButton = ({onPress = () => {}, title, disabled}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.buttonDisable]}>
      <Text style={[styles.buttonText, disabled && styles.textDisable]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
