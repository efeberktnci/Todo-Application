import React from 'react'
import Routes from './navigation/Routes'
import {NavigationContainer} from "@react-navigation/native"

export default function App() {
  return (
   <NavigationContainer>
    <Routes />
   </NavigationContainer>
  )
}