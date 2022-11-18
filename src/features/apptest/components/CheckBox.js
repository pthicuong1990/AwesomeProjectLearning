import {useEffect, useState} from 'react';
import React, {Text, TouchableOpacity} from 'react-native';
import Logo from '../../../asset/icon/checkBoxSelected.svg';
import LogoUnCheck from '../../../asset/icon/checkBoxUnselected.svg';

export default CheckBox = ({
  checked = false,
  size,
  title = '',
  isControlOutSide = false,
  onPress,
}) => {
  console.log(`Draw Check box${checked}, ${title}, ${isControlOutSide}`);

  const [isSelected, setSelected] = useState(checked);

  useEffect(() => {
    setSelected(checked);
  }, [checked]);

  const Icon = isSelected ? (
    <Logo width={size} height={size} />
  ) : (
    <LogoUnCheck width={size} height={size} />
  );
  const onSelected = () => {
    if (onPress) {
      onPress(!isSelected);
    }
    setSelected(!isSelected);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        onSelected();
      }}
      style={{
        flexDirection: 'row',
      }}>
      {Icon}
      <Text
        style={{
          size: 16,
          paddingHorizontal: 10,
          alignContent: 'center',
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
