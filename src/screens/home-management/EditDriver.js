import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { ButtonPrimary, InputField, Title, ThinText, PressableText } from "../../common-components";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'yup-phone';
import md5 from 'md5';
import { updateDriverService } from '../../service/driverService';


import AppContext from '../../context/appContext';

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  age: yup.string().trim().required(),
  phone: yup.string().trim().required().phone('AE')
});


const EditDriver = ({ navigation, route }) => {

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

  const [driverDetails, serDriverDetails] = useState(route.params.data);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValSelected, setIsValSelected] = useState(true);

  const [date, setDate] = useState(driverDetails.license_expiry);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(driverDetails.license_type);
  const [items, setItems] = useState([
    { label: 'Two Wheeler', value: 'Two Wheeler' },
    { label: 'Four Wheeler', value: 'Four Wheeler' }
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
          defaultValue={props.defaultValue}
        />
        {props.schemaName in errors && <Text style={{ color: 'red' }}>Check {props.lable} </Text>}
      </View>
    );
  };

  const updateDriverHandler = data => {
    if (value == null) {
      setIsValSelected(false)
    }
    else {
      setIsValSelected(true)
      //setIsLoading(true)
      let x = data;
      x.license_type = value;
      x.license_expiry = date;
      updateDriverService(driverDetails.id, x, myContext.authDetails.token)
        .then((res) => {
          if (res.status == 200) {
            alert('Driver details updated succesfully')
            navigation.popToTop();
          }
        });


    }
  };
  return (
    <View style={styles.container}>
      <Title style={{ color: 'white', fontSize: 26 }} >Create Driver</Title>
      <View style={{ width: "80%" }}>
        <FieldItem
          lable="Name"
          schemaName="name"
          defaultValue={driverDetails.name}
        />

        <View style={styles.inputItemContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, values } }) => (
              <>
                <Title style={{ color: 'white', marginBottom: 4 }}>License Type</Title>
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
            defaultValue={driverDetails.license_type}
          />
          {"license_type" in errors && <Text style={{ color: 'red' }}>Check License Type </Text>}
        </View>
        <FieldItem
          lable="Age"
          schemaName="age"
          defaultValue={JSON.stringify(driverDetails.age)}
        />

        <View>
          <TouchableOpacity style={styles.inputItemContainer}
            onPress={showDatepicker}
          >
            <>
              <Title style={{ color: 'white' }}>License Expiry</Title>
              <InputField
                style={styles.input}
                editable={false}
                value={date.replaceAll("/", "-")}
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
        {/* <FieldItem
          lable="License Expiry"
          schemaName="license_expiry"
          defaultValue={driverDetails.license_expiry}
        /> */}
        <FieldItem
          lable="Phone Number"
          schemaName="phone"
          defaultValue={driverDetails.phone}
        />
      </View>
      <ButtonPrimary
        onPress={handleSubmit(updateDriverHandler)}
      >Update </ButtonPrimary>
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

export default EditDriver;