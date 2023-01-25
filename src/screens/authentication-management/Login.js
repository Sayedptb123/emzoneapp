import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'yup-phone';
import AsyncStorage from '@react-native-async-storage/async-storage';



import { ButtonPrimary, InputField, Title, ThinText, PressableText } from "../../common-components";
import { loginService } from '../../service/authService';
import AppContext from '../../context/appContext';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().trim().required(),
});

const Login = ({ navigation }) => {


  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    resolver: yupResolver(schema),
  });

  const myContext = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

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

  const saveDataToStorage = (data) => {
    AsyncStorage.setItem('userData', JSON.stringify(data));
  };

  const loginHandler = data => {
    setIsLoading(true);
    loginService(data)
      .then((res) => {
        const a = res.data;
        if (201 == res.status) {
          saveDataToStorage(res.data)
          myContext.setUserData(res.data)
          myContext.setUserData({
            ["id"]: a.user.id,
            ["name"]: a.user.name,
            ["email"]: a.user.email,
            ["mobileNumber"]: a.user.mobileNumber,
            ["token"]: a.token,
            ["didTryAutoLogin"]: true
          })
        }
        else {
          alert(res.data.message)
        }
      });
  };

  return (
    <View style={styles.container}>
      <Title style={{ color: 'white', fontSize: 26 }} >Login</Title>
      <View style={{ width: "80%" }}>

        <FieldItem
          lable="Email"
          schemaName="email"
        />
        <FieldItem
          lable="Password"
          schemaName="password"
        />
      </View>

      <ButtonPrimary onPress={handleSubmit(loginHandler)}>Login</ButtonPrimary>
      <View style={{ flexDirection: 'row' }} >
        <ThinText>Already have an account?</ThinText>
        <PressableText onPress={() => navigation.navigate('Register')}> Signup</PressableText>
      </View>
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


export default Login;