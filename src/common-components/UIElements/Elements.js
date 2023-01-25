import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from "react-native"

export const Title = ({ ...props }) => {
    return (
        <Text style={styles.title}  {...props}>{props.children}</Text>
    );
};

export const ThinText = ({ ...props }) => {
    return (
        <Text style={styles.thinText}  {...props}>{props.children}</Text>
    );
};


export const PressableText = ({ ...props }) => {
    return (
        <TouchableOpacity style={{}} {...props} >
            <Text style={styles.pressableText}  {...props}>{props.children}</Text>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    title: {
        color: '#7C8EB1',
        fontWeight: 'bold'
    },
    pressableText: {
        color: 'white',
        fontWeight: 'bold'
    },
    thinText: {
        fontSize: 14,
        color: "white",
        fontWeight: '400'
    }

});