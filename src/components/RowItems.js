import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Colors from '../styles/Colors';

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    color: Colors.text,
  },
  separator: {
    backgroundColor: Colors.border,
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
  },
  devider: {
    height: 20,
  },
});

export const RowItem = ({title, onPress, rightIcon}) => (
  <TouchableOpacity onPress={onPress} style={styles.row}>
    <Text style={styles.text}>{title}</Text>
    {rightIcon}
  </TouchableOpacity>
);

export const RowSeparator = () => <View style={styles.separator} />;

export const Devider = () => <View style={styles.devider} />;
