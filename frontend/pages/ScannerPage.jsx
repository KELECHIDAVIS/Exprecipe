import React from 'react'
import { Text, View } from 'react-native'
import appColors from '../assets/appColors'

function ScannerPage() {
  return (
    <View style={{flex:1 , backgroundColor:appColors.bgColor, alignItems:'center', justifyContent:'center'}}>
      <Text style={{color:appColors.secondaryColor, fontWeight:'bold', fontSize:24}}>Scanner Coming In Version 1!</Text>
    </View>
  )
}

export default ScannerPage