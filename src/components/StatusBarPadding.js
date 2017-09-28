import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native'

export default class StatusBarPadding extends Component {
  render(){
    return(
      <View style={styles.statusBarPadding}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBarPadding: {
    height: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: 'transparent'
  }
})