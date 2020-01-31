import React, { useState ,useEffect } from 'react';
import {StyleSheet, Image, View,Text,TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import MapView ,{Marker, Callout} from 'react-native-maps';
import {  MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';


function Main({navigation}){
    const [devs,setDevs]= useState([]);
    const [currentRegion, setCurrentRegion]= useState(null);
    const [techs,setTechs] = useState('');
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

    async function loadDevs(){
        const {latitude,longitude} = currentRegion;

        const response = await api.get('/search',{
            params:{
                latitude,
                longitude,
                techs
            }
        });
        console.log(response.data);
        setDevs(response.data.devs);


    }

    async function handleRegionChanged(region){
        setCurrentRegion(region);
    }

    if(!currentRegion){
        return null;
    }

    return (
    <>
    <MapView 
        onRegionChangeComplete={handleRegionChanged}  
        initialRegion={currentRegion} 
        style={Styles.map} > 

       {devs.map(dev =>(
            <Marker 
            key={dev._id}
            coordinate={{
                longitude:dev.location.coordinates[0],
                latitude:dev.location.coordinates[1],
                
            }}
            >
    
              <Image 
                style={Styles.avatar} 
                source={{uri: dev.avatar_url}}
              />  
            
              <Callout onPress={()=>{
                  navigation.navigate('Profile',{github_username: dev.github_username});
                  
              }}>
            
                <View style={Styles.Callout}>
                    <Text style={Styles.devName}>{dev.name}</Text>
                    <Text style={Styles.devBio}>{dev.bio}</Text>
                    <Text style={Styles.devTechs}>{dev.techs.join(', ')}</Text>
                </View>
              </Callout>
            </Marker>
       ))}
    </MapView>
    <View style={Styles.searchForm}>
        <TextInput  
            style={Styles.searchInput} 
            placeholder="Buscar Devs Por Tecnologias"
            placeholderTextColor="#999"
            autoCapitalize="words"
            value = {techs}
            autoCorrect={false}
            onChangeText={setTechs}
        
        />
        <TouchableOpacity onPress={loadDevs} style={Styles.loadButton}>
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