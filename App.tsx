/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import HomeStack from './routes/homeStack';
import Loading from './screens/loading';
import SplashScreen from 'react-native-splash-screen';




function App(): JSX.Element {

  // useEffect(()=>{
  //   SplashScreen.hide();
        
  //     },[])

  return (
    <HomeStack/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default App;
