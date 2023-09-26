import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.header}>
        <Image
                    style={{width:90, height:90,marginRight:5,}}
                    source={require('../assets/voiceIcon.png')}
        />
        <Text style={styles.headerText}>VoiceVer</Text>   
    </View>
  );
};

const styles = StyleSheet.create({
    header:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ff6347',
    },
    headerText:{
        fontWeight: 'bold',
        fontSize: 35,
        color: 'black',
        letterSpacing: 2,

    },
});

export default Loading;
