
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  Login, Register
} from '../screens/authentication-management';
import {
  Home, Passengers, DriverList, CreateDriver, EditDriver
} from '../screens/home-management';



const AuthStackNavigator = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator
      initialRouteName="Login"
      headerMode="screen"
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#e6020b' },
      }}>

      <AuthStackNavigator.Screen
        name="Login"
        component={Login}
      />
      <AuthStackNavigator.Screen
        name="Register"
        component={Register}
      />
    </AuthStackNavigator.Navigator>
  );
};

const HomeStackNavigator = createNativeStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#e6020b' },
      }}
    >
      <HomeStackNavigator.Screen
        name="Home"
        component={Home}
      />
      <HomeStackNavigator.Screen
        name="Passengers"
        component={Passengers}
      />
      <HomeStackNavigator.Screen
        name="DriverList"
        component={DriverList}
      />
      <HomeStackNavigator.Screen
        name="CreateDriver"
        component={CreateDriver}
      />
      <HomeStackNavigator.Screen
        name="EditDriver"
        component={EditDriver}
        initialParams={{
          data: '0'
        }}
      />
    </HomeStackNavigator.Navigator>
  );
};

