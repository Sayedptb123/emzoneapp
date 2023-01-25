import React from 'react';
import { TextInput, StyleSheet } from "react-native";

// INPUT FIELD
export const InputField = ({ ...props }) => {
    return (
        <TextInput
            style={styles.input}
            {...props}
        />
    );
};




const styles = StyleSheet.create({
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