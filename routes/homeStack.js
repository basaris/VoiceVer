import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/home';
import Train from '../screens/train';
import Test from '../screens/test';
import About from '../screens/about';
import Success from '../screens/success';



const Stack = createStackNavigator();

export default function HomeStack(){
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home' screenOptions={{
            headerStyle: {
                backgroundColor: '#ff6347',
                height:70, 
                         
              },
              headerTitleAlign: 'center'
              }}>
          <Stack.Screen name='Home' component={Home} options={
            {title: '',
            headerTransparent: true
            }}/>
    
          <Stack.Screen name='Train' component={Train} options={
            {title: '',
            headerTransparent: true
            }}/>
          
          <Stack.Screen name='Test' component={Test} options={
            {title: '',
            headerTransparent: true
            }}/>

          <Stack.Screen name='About' component={About} options={
            {title: '',
            headerTransparent: true
            }}/>
        
        
          </Stack.Navigator>
        </NavigationContainer>
      );
}

