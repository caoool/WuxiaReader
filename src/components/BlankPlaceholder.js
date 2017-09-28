import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View
} from 'react-native'

import { Title } from 'native-base'

export default class BlankPlaceholder extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Title style={styles.text}>{this.props.title}</Title>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    )
  }
}

BlankPlaceholder.defaultProps = {
  title: 'Empty',
  text: 'Please add item or pull down to refresh'
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    color: 'white'
  }
})