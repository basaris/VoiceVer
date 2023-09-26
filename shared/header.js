import React from "react";
import { StyleSheet, View,Text ,Image, Button} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function Header({navigation}){
    return(
        <View style={styles.header}>
            <Image
                style={{width:55, height:60, marginRight:6,}}
                source={require('../assets/voiceIcon.png')}
            />
            <Text style={styles.headerText}>VoiceVer</Text>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('About')}>
                <Text>!!!</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        alignItems:'center',
    },
    headerText:{
        fontWeight: 'bold',
        fontSize: 22,
        color: 'black',
        letterSpacing: 2,

    },
    button:{

    }
})