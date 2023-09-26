import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import { globalStyles } from '../styles/global';
import { trainStyles } from '../styles/trainStyles';

export default function About() {
    return(
        <View style={trainStyles.container}>
            <Text style={trainStyles.title}>Μάθετε για εμάς</Text>
            
            <Text style={trainStyles.titleText}>About page</Text>

           
            <StatusBar
                backgroundColor='white'
                barStyle='dark-content'
            />
        </View>
    )
}
