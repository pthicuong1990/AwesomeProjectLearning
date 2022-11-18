import * as React from "react";

import { Provider, useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";

import Home from "../features/Home";
import Converter from "../features/currency/Converter";
import CurrencyList from "../features/currency/CurrencyList";
import Close from "../asset/icon/close.svg";
import Login from "../features/apptest/Login";
import Otp from "../features/apptest/VerifyOtp";
import HomeTest from "../features/apptest/HomeTest";
import Reports from "../features/apptest/Reports";
import CustomDrawerContent from "../features/apptest/components/CustomDrawer";
import ListOfTask from "../features/todo/ListOfTask";
import store from "../redux/store";
import { isLoginSelector } from "../features/apptest/redux/loginSelector";
import AppColor from "../styles/AppColor";
import { getUser, isUserLoggedIn } from "../features/apptest/redux/loginSlice";
import { ConversionContextProvider } from "../utils/ConversionContext";
import { LoginContextProvider } from "../features/apptest/AppContext/LoginContext";
import { ReportContextProvider } from "../features/apptest/AppContext/ReportContext";

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const LoginStack = createStackNavigator();

const LoginStackScreen = (navigation) => {
  return (
    <LoginContextProvider>
      <LoginStack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Verify Otp"
          component={Otp}
          options={{
            headerStyle: {
              shadowColor: AppColor.colorOnPrimary,
            },
          }}
        />
      </LoginStack.Navigator>
    </LoginContextProvider>
  );
};

const DrawerStackScreen = (navigations) => {
  console.log(`DrawerStackScreen: ${JSON.stringify(navigations)}`);
  return (
    <DrawerStack.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerStack.Screen name="Reports" component={HomeTest} />
      {/* <DrawerStack.Screen name="To Do List" component={ListOfTask} />
      <DrawerStack.Screen name="Converter" component={Converter} /> */}
    </DrawerStack.Navigator>
  );
};

const MainStackScreen = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(isUserLoggedIn());
    dispatch(getUser());
  });
  const isLogin = useSelector(isLoginSelector);

  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      /> */}
      {isLogin ? (
        <Stack.Group>
          <Stack.Screen
            name="MainDrawer"
            component={DrawerStackScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="LoginFlow"
            component={LoginStackScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

const ModalStackScreen = () => {
  return (
    <ModalStack.Navigator screenOptions={{ presentation: "Main" }}>
      <ModalStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <ModalStack.Screen
        name="CurrencyList"
        component={CurrencyList}
        options={({ navigation, route }) => ({
          title: route.params && route.params.title,
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={{ paddingHorizontal: 10 }}
            >
              <Close width={20} height={20} />
            </TouchableOpacity>
          ),
        })}
      />
    </ModalStack.Navigator>
  );
};
export default () => {
  return (
    <NavigationContainer>
      <ConversionContextProvider>
        <ReportContextProvider>
          <Provider store={store}>
            <ModalStackScreen />
          </Provider>
        </ReportContextProvider>
      </ConversionContextProvider>
    </NavigationContainer>
  );
};
