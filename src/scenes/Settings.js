import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import {
  Container,
  Text,
  Button,
  Icon
} from 'native-base'

import Rate from 'react-native-rate'

import Loader from '../utils/Loader'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rated: false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button bordered block
          style={styles.button}
          onPress={() => {
            let options = {
              AppleAppID: '1281812472',
              preferInApp: false,
            }
            Rate.rate(options, (success)=>{
              if (success) {
                // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                this.setState({ rated: true })
              }
            })
          }}>
          <Icon name={'md-heart-outline'} />
          <Text>Rate me!</Text>
          <Icon name={'md-heart-outline'} />
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    margin: 15
  }
})