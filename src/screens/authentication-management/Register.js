import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'yup-phone';

import { ButtonPrimary, InputField, Title, ThinText, PressableText } from "../../common-components";
import { registerService } from '../../service/authService';


const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required().email(),
  password: yup.string().trim().required(),
  password_confirmation: yup.string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match')
});


const Register = ({ navigation }) => {

  // Reslover
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  const signUpHandler = data => {
    setIsLoading(true)
    registerService(data)
      .then((res) => {
        if (res.status == 201) {
          alert('user registered succesfully')
          navigation.navigate('Login')
        }
      });
  };
  return (
    <View style={styles.container}>
      <Title style={{ color: 'white', fontSize: 26 }} >Signup</Title>
      <View style={{ width: "80%" }}>
        <FieldItem
          lable="Name"
          schemaName="name"
        />
        <FieldItem
          lable="Email"
          schemaName="email"
        />
        <FieldItem
          lable="Password"
          schemaName="password"
        />
        <FieldItem
          lable="Confirm Password"
          schemaName="password_confirmation"
        />
      </View>
      <ButtonPrimary
        onPress={handleSubmit(signUpHandler)}
      >Sign Up </ButtonPrimary>
      <View style={{ flexDirection: 'row', marginVertical: 16 }} >
        <ThinText>Already have an account?</ThinText>
        <PressableText onPress={() => navigation.navigate('Login')}> Signin</PressableText>
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

export default Register;