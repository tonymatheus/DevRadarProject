import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'react-native';
import Routes from './src/pages/routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="Light-content" backgroundColor="#7D40E7"/>
       <Routes />
    </>
  );
}


  

