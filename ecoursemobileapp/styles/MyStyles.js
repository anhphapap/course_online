import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex:1
    },
    subject:{
        fontSize:30,
        fontWeight:"bold",
        color: "blue",
        textAlign: "center",
        textTransform: "uppercase"
    },
    m:{
        margin: 5
    },
    p:{
        padding:5
    },
    wrap:{
        flexWrap: "wrap"
    },
    row:{
        flexDirection:"row"
    },
    mt:{
        marginTop: 25
    },
    avatar:{
        width: 100,
        height: 100,
        borderRadius: 50
    }
})