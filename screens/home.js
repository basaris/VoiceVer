import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Alert, StatusBar, Image, TouchableOpacity} from 'react-native';
import { homeStyles } from '../styles/homeStyles';
import {useIsFocused} from '@react-navigation/native';
import RNFS from 'react-native-fs';

const filePath = RNFS.DocumentDirectoryPath + '/state.json';

// import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Home({navigation}) {
    const [isTrained,setIsTrained] = useState('false');
    const [data,setData] = useState();

    const isFocused = useIsFocused();


      useEffect(()=>{
        const getValue = async() => {
            RNFS.readFile(filePath, 'utf8').then((fileContent) => {
                const data = JSON.parse(fileContent);

                if(data.state == "firstTrain"){
                    setIsTrained('true');
                }else if(data.state == "unTrained"){
                    setIsTrained('false');
                }
            })
            .catch((error) => {
                console.error('Error reading JSON file:', error);
            });
          }
          if(isFocused){getValue();}
      },[isFocused])



    return(
        <View style={{flex:1}}>
            <View style={styles.header}>
                <Image
                    style={{width:55, height:60, marginRight:6,}}
                    source={require('../assets/voiceIcon.png')}
                />
                <Text style={styles.headerText}>VoiceVer</Text>   
            </View>

            <StatusBar
                animated={false}
                backgroundColor='#ff6347'
                showHideTransition={'none'}
                barStyle={'dark-content'}
                
            /> 

            <Text style={homeStyles.welcomeText}>Καλωσήρθατε στο VoiceVer</Text>
            {isTrained=='true'?
            <Text style={homeStyles.welcomeText2}>
                Έχεις εκπαιδεύσει τον αλγόριθμο σου. Μπορείς να τον δοκιμάσεις:
            </Text>
            :
            <Text style={homeStyles.welcomeText2}>
                Πριν χρησιμοποιησετε τον αλγόριθμο, πρέπει να το προπονήσετε μιλώντας στο μικρόφωνο. Πατήσετε για να ξεκινήσετε:
            </Text>
            }

            <View style={homeStyles.paragraph}>
                {isTrained=='true'?
                <TouchableOpacity style={[homeStyles.container]} onPress={()=>navigation.navigate('Test')}>
                    <Text style={homeStyles.titleText}>Δοκιμάστε τον αλγόριθμο</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={homeStyles.container} onPress={()=>navigation.navigate('Train')}>
                    <Text style={homeStyles.titleText}>Ξεκινήστε</Text>
                </TouchableOpacity>
                }
                
                


            </View>

            
            <Text style={styles.abso} onPress={() => navigation.navigate('About')}>?</Text>


            
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ff6347',
        borderBottomRightRadius:30,
        borderBottomLeftRadius:30,
        padding:7,
    },
    headerText:{
        fontWeight: 'bold',
        fontSize: 22,
        color: 'black',
        letterSpacing: 2,

    },
    abso:{
        textAlignVertical:'center',
        textAlign:'center',
        position:'absolute',
        bottom:20,
        right:20,
        height:60,
        width:60,
        fontSize:31,
        backgroundColor:'#ff6347',
        borderRadius:100,
        paddingBottom:3,
        paddingLeft:2,

        borderWidth:2,
        color:'black',
    }
})
