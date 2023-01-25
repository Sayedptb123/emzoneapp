import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  AuthNavigator, HomeNavigator
} from './ScreenNavigator';
import SplashScreen from '../screens/SplashScreen';
import AppContext from '../context/appContext';

const AppNavigator = props => {

  const myContext = useContext(AppContext);

  const isAuth = !!myContext.authDetails.token
  const isAutoLogin = myContext.authDetails.didTryAutoLogin

  return (
    <NavigationContainer>
      {!isAuth && isAutoLogin && <AuthNavigator />}
      {!isAuth && !isAutoLogin && <SplashScreen />}
      {isAuth && <HomeNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;