import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, StatusBar, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import axios from "axios";

import AppContext from '../../context/appContext';

import { getDriverlistService, deleteDriverService } from '../../service/driverService';
const DriverList = ({ navigation, route }) => {
  const myContext = useContext(AppContext);

  const [driversList, setDriversList] = useState([]);

  const loadDetails = () => {
    getDriverlistService(myContext.authDetails.token)
      .then((res) => {
        setDriversList(res.data)
      });
  }
  useEffect(() => {


    loadDetails();

  }, []);

  const EmptyListMessage = ({ item, index }) => (
    <View style={{ flex: 1, justifyContent: 'center', height: 400 }}>
      <Text > No item found. </Text>
    </View>
  )

  const deleteHandler = (id) => {
    deleteDriverService(myContext.authDetails.token, id)
      .then((res) => {
        if (res.data == 1) {
          loadDetails();
        }
      });
  }

  const editHandler = (i) => {
    navigation.navigate('EditDriver', { data: i })
  }

  const renderItem = ({ item }) => {
    return (

      <View key={item._id} style={styles.flatlistItem}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#3AA1F1', fontWeight: 'bold', fontSize: 21 }}>{item.id} :   {item.name}</Text>
        </View>

        <Text style={{ color: '#36A47A', fontWeight: 'bold', fontSize: 15 }}>{item.license_type}</Text>

        <View style={{ marginTop: 11 }}>
          <View style={styles.rowItems}>
            <Text style={styles.detailsLabel}>Gender </Text>
            <Text style={styles.detailsValue}>{item.gender}</Text>
          </View>


          <View style={styles.rowItems}>
            <Text style={styles.detailsLabel}>Expiry </Text>
            <Text style={styles.detailsValue}>{item.license_expiry}</Text>
          </View>


          <View style={styles.rowItems}>
            <Text style={styles.detailsLabel}>Phone </Text>
            <Text style={styles.detailsValue}>{item.phone}</Text>
          </View>


          <View style={styles.rowItems}>
            <Text style={styles.detailsLabel}>Age </Text>
            <Text style={styles.detailsValue}>{item.age}</Text>
          </View>

          <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.buttonDelete} onPress={() => deleteHandler(item.id)}>
          <Text style={{ color: 'red' }}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonEdit} onPress={() => editHandler(item)}>
          <Text style={{ color: 'blue' }}>Edit</Text>
        </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='#ebf2ff'
      />
      <FlatList
        data={driversList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={EmptyListMessage}
      />
    </SafeAreaView>
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
    justifyContent: 'center'

  },
  itemTitle: {
    color: '#fff',
    fontSize: 26
  },
  flatlistItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: 11,
    padding: 6,
    borderWidth: 1,
    width: Dimensions.get('window').width * .9
  },
  flatlistItemz: {
    width: '98%',
    borderWidth: 1,
    borderColor: '#717473',
    marginBottom: 6,
    padding: 11,
    marginHorizontal: 11,
    borderRadius: 6
  },
  detailsLabel: {
    color: '#D8577E',
    fontWeight: '400',
    fontSize: 12
  },
  detailsValue: {
    color: '#797C7B',
    fontWeight: 'normal',
    fontSize: 15
  },
  rowItems: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContainer:{
    marginTop:15,
    width: Dimensions.get('window').width * .78,
    justifyContent:'space-around',
    flexDirection:'row'
  },
  buttonDelete:{
    borderWidth:1,
    borderRadius:6,
    width:'43%',
    alignItems:'center',
    justifyContent:'center',
    padding:2
  },
  buttonEdit:{
    borderWidth:1,
    borderRadius:6,
   width:'43%',
   alignItems:'center',
   justifyContent:'center',
   padding:2
  }
});

export default DriverList;