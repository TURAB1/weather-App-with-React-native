/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Pressable,
  ToastAndroid,Platform,Alert
} from 'react-native';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

  import {ForecastToday} from './components/Forecast_today';
import { ForecastComingDays } from './components/Forecast_future_days';


function App(): React.JSX.Element {
  const [city, setCity] = React.useState("seoul");
  const [data, setData] = React.useState(null);
  const [country,setCountry]=React.useState("korea");
  const [weatherIcon,setWeatherIcon]=React.useState(null);
  const [temperature,setTemperature]=React.useState("")
  const  [weatherDetails,setWeatherDetails]=React.useState("")
  const  [currentTime,setCurrentTime]=React.useState("");

  let baseUrl="https://api.weatherapi.com/v1/forecast.json?q="+city+"&days=7&key=b2c2ffd9786543caada62933242802";
  const handleSearch=()=>{
    console.log(baseUrl);
    fetchingData(baseUrl);
    //console.log(data);
  
  };

  
  async function fetchingData(baseUrl:string){
  fetch(baseUrl)
     .then((Response)=>Response.json())
     .then((data)=>{
      setData(data);
      console.log(data.location.localtime);
      setCountry(data.location.country);
      setWeatherIcon(data.current.condition.icon);
      setTemperature(data.current.temp_c);
      setWeatherDetails(data.current.condition.text);
      setCurrentTime(data.location.localtime);
    
    
        })
      .catch(error=>{
       // console.error(error); 
       console.log("check city spelling");
       if (Platform.OS === 'android') {
        ToastAndroid.show("check city spelling", ToastAndroid.SHORT)
      } else {
        Alert.alert("check city spelling");
      }
  
      })  
    
     
  }
  function getTime(){
  
     let currentHourMin=currentTime.split(" ")[1];
     let currentHour=currentHourMin.split(":")[0];
     return currentHour;

  }
 
  const getTodayForecast=()=>{

     if (data !==null){
      return  data.forecast.forecastday.map((item, index) => {
        if(index==0)
        {  let days=item;
      //console.log(days.hour[0]);
         
    //   return (
    //   <ForecastToday/>
    // );
    return  days.hour.map((item, index) => {
     // if(index==0)
     // {  let hours=item;
    //console.log(index);
       
    return (
    <ForecastToday key={index} hour={index} icon={item.condition.icon} temperature={item.temp_c} details={item.condition.text}/>
  );
//}
   
  });

  /////iff

   }
     
    });
  }
  }

  const getComingDaysForecast=()=>{

    if (data !==null){
     return  data.forecast.forecastday.map((item, index) => {
       if(index!==0)
       {  let days=item;
     //console.log(days.hour[0]);
     return (
      <ForecastComingDays key={index} day={item.date} icon={item.day.condition.icon} maxTemp={item.day.maxtemp_c} minTemp={item.day.mintemp_c} details={item.day.condition.text}/>
    );

  }
    
   });
 }
 }
  const views = [];
    

    for (let i = 9; i < 24; i++) {
      views.push(
        <View style={styles.weatherStyle}key={i}>
        <Text>Hour</Text>     
        <Image 
        style={styles.weatherIcon}
        source={require("./images/weather.png")}/>
        <Text> 3d°C</Text>  
        <Text>Cloudy</Text>
        </View>
      );
    }

  
  React.useEffect( ()=>{
    fetchingData(baseUrl);
  },[]);
    
  //setTimeout(fetchingData,300000,baseUrl);
    return (
    
     
        
        <View
          style={{
            backgroundColor: "#007fff",width:"100%",height:"100%"
          }}>

          <View>
          
            <View style={styles.searchSection}>
            <TextInput
            style={styles.searchInput}
            onChangeText={setCity}
            value={city}
            placeholder='Enter city'
            keyboardType="ascii-capable"
            />
            
            <Pressable style={styles.searchButton} onPress={handleSearch}>
              <Image
              style={styles.searchIcon}
              source={require("./images/search_icon.png")}/>
            </Pressable>
            </View>
          </View>

         <View style={styles.weatherSection}>
         <Text>{city}, {country}</Text> 

         <Image 
         style={styles.weatherIcon}
         source={{uri:"https:"+weatherIcon}}/>
         <Text> {temperature}°C</Text>  
         <Text>{weatherDetails}</Text>
         <Text>{currentTime.split(" ")[1]}</Text>
         <Text>{new Date(currentTime).toLocaleDateString("en-EN", { weekday: 'short' })},{currentTime.split(" ")[0]} </Text>


         </View>

           <View style={styles.lineSection}></View>
           <View style={styles.scrollViewContainer}>
           <ScrollView style={styles.scrollViewSection} horizontal={true}>
           
            {
              getTodayForecast()
            }
          
            </ScrollView>
            </View>
            <View style={styles.lineSection}></View>

            <View style={styles.scrollViewContainer}>
           <ScrollView style={styles.scrollViewSection} horizontal={true}>
           
            {
              getComingDaysForecast()
            }
          
            </ScrollView>
            </View>
               

        </View>
    
  
  );
}

const styles = StyleSheet.create({


  sectionContainer: {
    marginTop: 32,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
 
    
    
  },
  searchSection:{
    marginTop: 32,
    display:"flex",
    flexDirection:"row",
    alignContent:"center",
    justifyContent:"center"
  },
  searchInput:{
    backgroundColor:"white",
    width:150,
    height:35
  },
  searchButton:{
   backgroundColor:"white",
   height:35,
   borderRadius:10,
  },
  weatherSection:{
  marginTop:20,
  justifyContent:"space-evenly",
  flex:0,
  alignItems:"center"

  },
  
  weatherIcon:{
   width:50,
   height:50

  },
  searchIcon:{
  height:30,
  width:30

  },

   scrollViewSection:{
   display:"flex",
   flexDirection:"row"
   
   },
   scrollViewContainer:{
    height:150,
    marginTop:20
   },
   todayWeather:{
    display:"flex",
    flexDirection:"column"
   },

   weatherStyle:{
    marginLeft:20
} ,

lineSection:{
backgroundColor:"black",
height:1,
marginTop:20



},









  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
