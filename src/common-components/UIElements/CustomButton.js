import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { Title } from "./Elements";


export const ButtonPrimary = ({ ...props }) => {
    return (
        <TouchableOpacity style={styles.buttonPrimary} {...props}>
            <Title>{props.children}</Title>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    buttonPrimary: {
        backgroundColor: 'white',
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 6,
        elevation: 5,
        margin: 11
    }
});