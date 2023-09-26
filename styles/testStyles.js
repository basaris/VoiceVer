import { StyleSheet } from "react-native";

export const testStyles = StyleSheet.create({
    container:{
        alignItems:'center',
    },
    titleText:{
        fontSize:18,
        color: '#333',   
        paddingHorizontal:20,
        paddingTop: 60,
    },
    icon:{
        width:50,
        height:50,
        marginTop:70,
        padding:90,
        opacity:1,
        
    },
    iconButton:{
        justifyContent:'center',
        alignItems:'center',
        width:160,
        height:160,
        marginTop:100,
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
        paddingTop:10 
    },
    loadingContainer:{
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,

    },
    loadingBackground:{
        borderTopColor: '#ff6347' ,
        borderLeftColor: 'rgba(0, 0, 0, 0.01)' ,
        borderRightColor: 'rgba(0, 0, 0, 0.01)' ,
        borderBottomColor:'rgba(0, 0, 0, 0.01)',
        width: '100%',
        height: '100%',
        borderRadius: 25,
        borderWidth: 7,
        justifyContent:'center',
        alignContent:'center',
        position:'absolute',

    },
    progress:{
        borderColor: '#ff6347' ,
        width: '100%',
        height: '100%',
        borderRadius: 25,
        borderWidth: 7,
        opacity:0.25, 
    },
    modal:{
        flex: 1,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: "#FAFAFA",
        borderRadius:40,
        borderWidth:5,


    },
    Modal:{
      flex:1,  
    },
    button:{
        paddingBottom:50,
        fontSize:18,
        lineHeight:22,
        paddingHorizontal:30,
        color:'black',
    },
    button2:{
        marginBottom:50,
        fontSize:18,
        lineHeight:22,
        paddingHorizontal:20,
        paddingVertical:8,
        color:'black',
        borderBottomWidth:4,
        borderRightWidth:4,
        borderLeftWidth:2,
        borderTopWidth:2,
        borderRadius:7,
    },
    closeButton:{
        fontSize:17,
        color:'black',
        backgroundColor:'#ff6347',
        borderWidth:1,
        
    },
    modalText:{

        marginTop:30,
        fontSize:25,
        paddingHorizontal:60,
        paddingVertical:12,
        borderRadius:30,
        color:'black',
    },
    x:{
        fontSize:25,
        fontWeight:'600',
        position:"absolute",
        right:0,
        top:0,
        borderRadius:100,
        borderWidth:1.5,
        backgroundColor:'white',
        width:40,
        height:40,
        textAlign:'center',
        paddingTop:1,
        color:'black'
    },
})