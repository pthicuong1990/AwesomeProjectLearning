import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import AppColor from '../../../styles/AppColor';
import {appStyles} from './AppStyles';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  dialogContainer: {
    width: '70%',
    borderRadius: 10,
    backgroundColor: AppColor.colorPrimary,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
    textAlign: 'center',
  },
  message: {fontSize: 16, textAlign: 'center', padding: 10},
  positiveButton: {
    fontSize: 16,
    fontWeight: '500',
    width: '100%',
    padding: 10,
    textAlign: 'center',
    color: AppColor.link,
  },
});

export const DialogMessage = ({
  title = 'OOPS',
  message = 'Some thing went wrong please try again!',
  visible = false,
  onPressOk = () => {},
}) => {
  const {height, width} = useWindowDimensions();
  return (
    visible && (
      <View style={[styles.container, {height, width}]}>
        <View style={styles.dialogContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={appStyles.divider} />
          <TouchableOpacity onPress={() => onPressOk()}>
            <Text style={styles.positiveButton}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};
