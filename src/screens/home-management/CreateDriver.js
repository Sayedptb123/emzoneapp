import React, { useState,useContext,useEffect } from 'react';
import { StyleSheet, View ,Text, Button,Platform, Touchable, TouchableOpacity} from 'react-native';
import { ButtonPrimary, InputField, Title, ThinText, PressableText } from "../../common-components";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'yup-phone';
import md5 from 'md5';
import axios from 'axios';
import { apiRegister } from '../../constants/api';
import {createDriverService} from '../../service/driverService';


import AppContext from '../../context/appContext';

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  //license_type: yup.string().required(),
  //license_expiry: yup.string().required(),
  age: yup.string().required(),
  phone: yup.string().trim().required().phone('AE')
});


const CreateDriver = ({ navigation }) => {

  // Reslover
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    resolver: yupResolver(schema),
  });

  const myContext = useContext(AppContext); 

  const [username, setUsername] = useState('');
  const [isValSelected, setIsValSelected] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Two Wheeler', value: 'Two Wheeler'},
    {label: 'Four Wheeler', value: 'Four Wheeler'}
  ]);

  useEffect(() => {
   
     }, []);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setShow(true)
  };

  const FieldItem = ({ ...props }) => {
    return (
      <View style={styles.inputItemContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Title style={{ color: 'white' }}>{props.lable}</Title>
              <InputField
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(val) => onChange(val)}
                value={value}
              />
            </>
          )}
          name={props.schemaName}
          defaultValue=""
        />
        {props.schemaName in errors && <Text style={{ color: 'red' }}>Check {props.lable} </Text>}
      </View>
    );
  };

  const createDriverHandler = data => {
    if(value == null){
      setIsValSelected(false)
    }
    else{
      setIsValSelected(true)
      setIsLoading(true)
      let x =data;
      x.license_type = value;
      x.license_expiry = date.toLocaleDateString().replaceAll("/","-").split("-").reverse().join("-");
      createDriverService(x,myContext.authDetails.token)
      .then((res) => {
         if(res.status == 201){
           alert('Driver details added succesfully')
           navigation.goBack();
         }
       
     }).catch((e)=>
     alert("Error:",e.message))
    }
 

  };
  return (
    <View style={styles.container}>
      <Title style={{ color: 'white', fontSize: 26 }} >Create Driver</Title>
      <View style={{ width: "80%" }}>
        <FieldItem
          lable="Name"
          schemaName="name"
        />
        <View style={styles.inputItemContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, valuess} }) => (
              <>
                <Title style={{ color: 'white',marginBottom:4 }}>License Type</Title>
                <DropDownPicker
                  dropDownDirection="TOP"
                  open={open}
                  value={value}
                  onBlur={onBlur}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
              </>
            )}
            name="license_type"
            defaultValue=""
          />
          {!isValSelected && <Text style={{ color: 'red' }}>Check License Type </Text>}
        </View>
        <FieldItem
          lable="Age"
          schemaName="age"
        />
        <View>
      <TouchableOpacity  style={styles.inputItemContainer}
      onPress={showDatepicker}
      >
        <>
        <Title style={{ color: 'white' }}>License Expiry</Title>
              <InputField
                style={styles.input}
                editable ={false}
                value={date.toLocaleDateString().replaceAll("/","-")}
              />
        </>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          onChange={onChange}
        />
      )}
    </View>
        <FieldItem
          lable="Phone Number"
          schemaName="phone"
        />
      </View>
      <ButtonPrimary
        onPress={handleSubmit(createDriverHandler)}
      >Create </ButtonPrimary>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7C8EB1'
  },
  top: {
    flex: 3,
  },
  inputItemContainer: {
    marginBottom: 11
  },
  input: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    borderRadius: 6,
    paddingLeft: 6,
    marginTop: 3,
    height: 40,
    elevation: 5
  }
});

export default CreateDriver;