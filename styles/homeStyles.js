import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container:{
        paddingTop:55,
        
    },
    titleText:{
        fontSize:19,
        color: '#333',   
        backgroundColor:'#ff6347',
        paddingHorizontal:30,
        paddingVertical:12,
        borderWidth:1.5,
        borderRadius:100,
    },
    paragraph:{
        flexDirection:'row',
        justifyContent:'space-evenly'
        
    },
    welcomeText:{
        fontSize:24,
        
        color: '#333', 
        paddingTop: 60,
        paddingBottom:60,
        paddingHorizontal:20,
    },
    welcomeText2:{
        fontSize:17,
        
        color: '#333', 
        paddingTop:90,
        
        paddingHorizontal:20,
    }
})