import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';

import AppContext from '../../context/appContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logOutService } from '../../service/authService';
const Home = ({ navigation, route }) => {


  const myContext = useContext(AppContext);

  useEffect(() => {

  }, []);
  const logOut = () => {
    AsyncStorage.removeItem("userData");
    myContext.setUserData({
      ["didTryAutoLogin"]: true,
    })
    alert("Logedout succesfully")
    navigation.navigate('Login')
  }

  const logOutHandler = data => {
    AsyncStorage.removeItem("userData");
    myContext.setUserData({
      ["didTryAutoLogin"]: true,
    })
  };



  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Passengers')}>
        <Text style={styles.buttonTitle}>Passengers</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateDriver')}>
        <Text style={styles.buttonTitle}>Add Driver</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DriverList')}>
        <Text style={styles.buttonTitle}>Driver List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => logOutHandler()}>
        <Text style={styles.buttonTitle}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: "#7C8EB1",
    width: '80%',
    height: 70,
    borederRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6

  },
  buttonTitle: {
    color: '#fff',
    fontSize: 26
  }
});

export default Home;