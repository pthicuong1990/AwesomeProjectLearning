import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import {userDataSelector} from '../redux/loginSelector';
import Colors from '../../../styles/Colors';
import {CustomSvgIcon, IconName} from './CustomSvgIcon';
import {logout} from '../redux/loginSlice';

const HeaderView = ({navigation}) => {
  const user = useSelector(userDataSelector);
  console.log('User', user);
  return (
    <View>
      <CustomSvgIcon
        name={IconName.IcClose}
        style={{margin: 20}}
        width={20}
        height={20}
        onPress={() => navigation.closeDrawer()}
      />
      <View
        style={{
          width: '100%',
          alignContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
        <CustomSvgIcon
          name={IconName.IcLogo}
          style={{margin: 20}}
          width={60}
          height={60}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: Colors.text,
          }}>
          {user.name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: Colors.textLight,
          }}>
          {user.email}
        </Text>
      </View>
    </View>
  );
};

const CustomDrawerContent = props => {
  console.log(`props: ${JSON.stringify(props)}`);

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <DrawerContentScrollView {...props}>
      <HeaderView navigation={props.navigation} />
      <DrawerItemList {...props} />
      <DrawerItem label="Log out" onPress={() => onLogout()} />
    </DrawerContentScrollView>
  );
};
export default CustomDrawerContent;
