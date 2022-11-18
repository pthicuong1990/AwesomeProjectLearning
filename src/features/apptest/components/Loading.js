import React from 'react';

import {
  ActivityIndicator,
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import AppColor from '../../../styles/AppColor';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
});
export const Loading = ({visible = false}) => {
  const {height, width} = useWindowDimensions();

  return (
    visible && (
      <View style={[styles.container, {height, width}]}>
        <ActivityIndicator size="large" color={AppColor.link} />
      </View>
    )
  );
};
