import React, {useState, useEffect} from 'react';
import { View, Text, Image,TouchableOpacity, Animated} from 'react-native';
import { homeStyles } from '../styles/homeStyles';


export default function Success({navigation}) {
    const [mic,setMic] = useState(false);

    return(
        <View>
            <Text style={{fontSize:18,
                        color: '#333', 
                        paddingHorizontal:20,
                        paddingTop: 200,}} >
                You've succesfully trained the model.
            </Text>
            <TouchableOpacity style={{alignItems:'center'}}onPress={()=> navigation.navigate('Test')}>
                <Text style={[homeStyles.titleText,{marginTop:80}]}>Test it</Text>
            </TouchableOpacity>

        </View>
    )
}