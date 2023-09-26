import { StyleSheet } from "react-native";

export const trainStyles = StyleSheet.create({
    container:{
        alignItems:'center',
        backgroundColor:'white',
        flex:1,
    },
    scroll:{
        flex:1,
        backgroundColor:'white',
        marginHorizontal:10,
        marginTop:7,
        paddingHorizontal:5,
        fontSize:16,
        borderWidth:2,
        borderRadius:15,
        

    },
    titleText:{
        fontSize:17,
        lineHeight:25,
        color: '#333',   
        // paddingHorizontal:20,
        paddingVertical:10,
    },
    title:{
        justifyContent:'center',
        fontSize:22,
        color: '#333',
        marginTop:55,
        paddingVertical:9,
        paddingHorizontal:60,
        borderRadius:20,

        backgroundColor:'#ff6347',
    },
    icon:{
        width:60,
        height:60,
    },
    icon2:{
        width:90,
        height:90,
        marginTop:40,
    },
    icon3:{
        marginTop:20,
        width:140,
        height:140,
    },
    iconButton:{
        justifyContent:'center',
        alignItems:'center',
        width:160,
        height:160,
        marginTop:30,
        marginBottom:9,
        opacity:1,
        borderRadius:200,
        borderColor:'black',
        borderWidth:2,
        backgroundColor:'#ff6347'
    },
    seconds:{
        fontSize:18,
        color: '#333', 
        paddingTop:5, 
    }
})