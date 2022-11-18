import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../styles/Colors';

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  containerDisable: {
    backgroundColor: Colors.offWhite,
  },
  button: {
    backgroundColor: Colors.white,
    padding: 15,
    borderBottomStartRadius: 5,
    borderTopStartRadius: 5,
    borderRightColor: Colors.border,
    borderRightWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.blue,
  },
  input: {
    flex: 1,
    color: Colors.textLight,
    padding: 10,
  },
});
export const ConversionInput = ({text, onButtonPress, ...props}) => {
  const containerStyles = [styles.container];
  if (props.editable === false) {
    containerStyles.push(styles.containerDisable);
  }
  return (
    <View style={containerStyles}>
      <TouchableOpacity onPress={onButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};
