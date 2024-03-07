import { StyleSheet, Text,View,Image } from "react-native";


export const ForecastToday=({hour,icon,temperature,details})=>{


    return(
        <View  style={styles.weatherStyle}>
        {hour>9?<Text>  {hour}:00</Text>:<Text>  0{hour}:00</Text> }    
        <Image 
        style={styles.weatherIcon}
        source={{uri:"https:"+icon}}/>
        <Text> {temperature}°C</Text>  
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

