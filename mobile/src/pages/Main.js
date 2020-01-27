import React, { useState ,useEffect } from 'react';
import {StyleSheet, Image, View,Text,TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import MapView ,{Marker, Callout} from 'react-native-maps';
import {  MaterialIcons } from '@expo/vector-icons';

function Main({navigation}){
    const [currentRegion,setCurrentRegion]= useState(null);

    useEffect(()=>{
        async function loadInitialPosition(){
            const {granted} = await requestPermissionsAsync();
            if(granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy:true,
                });
                const {latitude,longitude} = coords;
                
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta:0.04,
                    longitudeDelta:0.04,
                })
            }
        }
        loadInitialPosition();


    },[]);

    if(!currentRegion){
        return null;
    }

    return (
    <>
    <MapView initialRegion={currentRegion} style={Styles.map} > 

        <Marker coordinate={{latitude:-16.0721397,longitude:-48.0549366}}>
          <Image style={Styles.avatar} source={{uri: 'https://avatars3.githubusercontent.com/u/43850888?s=460&v=4'}}/>  
        
          <Callout onPress={()=>{
              navigation.navigate('Profile',{github_username:'tonymatheus'});
              
          }}>
        
            <View style={Styles.Callout}>
                <Text style={Styles.devName}>Tony Matheus</Text>
                <Text style={Styles.devBio}>Apaixonado por Tecnologia,sempre em busca da evolução do meu conhecimento.</Text>
                <Text style={Styles.devTechs}>ReactJs, Python, Django  </Text>
            </View>
          </Callout>
        </Marker>
    </MapView>
    <View style={Styles.searchForm}>
        <TextInput  
            style={Styles.searchInput} 
            placeholder="Buscar Devs Por Tecnologias"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
        
        />
        <TouchableOpacity onPress={()=>{}} style={Styles.loadButton}>
            <MaterialIcons name="my-location" size={20} color="#FFF"/>
        
        </TouchableOpacity>
    </View>
    </>
    );
}
const Styles = StyleSheet.create({
    map:{
        flex:1
    },

    avatar:{
        width:54,
        height:54,
        borderRadius:4,
        borderWidth:4,
        borderColor:'#FFF'
    },
    Callout:{
        width:260,
    },
   devName:{
    fontWeight:'bold',
    fontSize:16,
   },

   devBio:{
    color:'#666',
    marginTop:5,

   },

   devTechs:{
       marginTop:5,
   },
   searchForm:{
     position:'absolute',
     top:20,
     left:20,
     right:20,
     zIndex:5,
     flexDirection:'row'
   },
   searchInput:{
    flex : 1,
    height:50,
    backgroundColor:'#FFF',
    borderRadius:25,
    paddingHorizontal:20,
    fontSize:16,
    shadowColor:'#000',
    shadowOpacity:0.2,
    shadowOffset:{
        width:4,
        height:4,
    },
    elevation: 2,

   },
   loadButton:{
        width:50,
        height:50,
        backgroundColor: '#8E4DFF',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:15,
   },
})

export default Main;