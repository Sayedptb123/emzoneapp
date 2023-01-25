
import React, {  useEffect, useContext } from 'react';
import {
  View, Text, StyleSheet, StatusBar} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../context/appContext';
const SplashScreen = ({navigation}) => {
  const myContext = useContext(AppContext);

  const loadDetails = async() => {
    const userData = await AsyncStorage.getItem("userData");
    const transformedData = JSON.parse(userData);
    if (!userData) {
      myContext.setUserData({
        ["didTryAutoLogin"]: true
      })
    }
    else{
      myContext.setUserData(
        {
          ["id"]: transformedData.user.id,
          ["name"]: transformedData.user.name,
          ["email"]: transformedData.user.email,
          ["mobileNumber"]:transformedData.user.mobileNumber,
          ["token"]: transformedData.token,
        ["didTryAutoLogin"]: true
        })
    }
  }
  useEffect(() => {
    setTimeout(() => {
      loadDetails();
    }, 2000)
  }, []);

  return (
    <View style={styles.screen}>
    <StatusBar 
            animated={true}
            barStyle='dark-content'
            backgroundColor='#fff'/>
    <Text>EmiratesZone</Text> 
  </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex:1,
    height: '100%',
    alignSelf: 'center', 
    justifyContent: 'center', 
    alignItems: 'center'
    }
});

export default SplashScreen;