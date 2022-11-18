import React, {Pressable, View} from 'react-native';
import IcClose from '../../../asset/icon/ic_cross.svg';
import IcShowPass from '../../../asset/icon/ic_visibility_on.svg';
import IcHidePass from '../../../asset/icon/ic_visibility_off.svg';
import IcLogo from '../../../asset/icon/ic_logo.svg';
import IcLogoWithText from '../../../asset/icon/ic_logowith_text_small.svg';
import IcExpandLess from '../../../asset/icon/ic_expand_less.svg';
import IcCheckMarkGreen from '../../../asset/icon/ic_checkmark_green.svg';

export const IconName = {
  IcClose: 'Close',
  IcShowPass: 'ShowPass',
  IcHidePass: 'hidePass',
  IcLogo: 'logo',
  IcLogoWithText: 'logoWithText',
  IcExpandLess: 'expandLess',
  IcCheckMarkGreen: 'checkMarkGreen',
};

export const SvgIcon = (name, props) => {
  switch (name) {
    case IconName.IcClose:
      return <IcClose {...props} />;
    case IconName.IcShowPass:
      return <IcShowPass {...props} />;
    case IconName.IcHidePass:
      return <IcHidePass {...props} />;
    case IconName.IcLogo:
      return <IcLogo {...props} />;
    case IconName.IcLogoWithText:
      return <IcLogoWithText {...props} />;
    case IconName.IcExpandLess:
      return <IcExpandLess {...props} />;
    case IconName.IcCheckMarkGreen:
      return <IcCheckMarkGreen {...props} />;

    default:
      return <></>;
  }
};
export const CustomSvgIcon = ({
  name,
  width,
  height,
  onPress = () => {},
  ...props
}) => {
  const size = width && height ? {width, height} : null;
  return (
    <View {...props}>
      <Pressable onPress={() => onPress()}>{SvgIcon(name, size)}</Pressable>
    </View>
  );
};
