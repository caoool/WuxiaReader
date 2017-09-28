import React from 'react'
import { View, StatusBar } from 'react-native'

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={{ backgroundColor }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

export default MyStatusBar