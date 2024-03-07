import { StyleSheet, Text,View,Image } from "react-native";


export const ForecastComingDays=({day,icon,maxTemp,minTemp,details})=>{


    return(
        <View  style={styles.weatherStyle}>
        <Text>{new Date(day).toLocaleDateString("en-EN", { weekday: 'long' })}</Text> 
        <Text>{new Date(day).getMonth()+1}/{new Date(day).getDate()}</Text>    
        <Image 
        style={styles.weatherIcon}
        source={{uri:"https:"+icon}}/>
        <Text>Max Temp:{maxTemp}°C</Text> 
        <Text>Min Temp:{minTemp}°C</Text>  
        <Text>{details}</Text>
        </View>


    );
}

styles=StyleSheet.create({

    weatherIcon:{
        width:50,
        height:50
     
       },
    weatherStyle:{
        marginLeft:20
    }   

});

