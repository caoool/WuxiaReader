import React, { Component } from 'react'
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet
} from 'react-native'

import WordList from '../components/WordList'
import StatusBarPadding from '../components/StatusBarPadding'

import Loader from '../utils/Loader'
import UserManager from '../utils/UserManager'

export default class Glossary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      refreshing: true
    }
  }

  async loadWords() {
    const words = await UserManager.getWords()
    this.setState({
      isLoading: false,
      refreshing: false,
      words: words
    })
  }

  refresh = () => {
    this.setState({ refreshing: true })
    this.loadWords()
  }

  componentDidMount() {
    this.loadWords()
  }

  render() {
    let content = this.state.isLoading ? (
      <View style={styles.activityIndicator}>
        <ActivityIndicator />
      </View>
    ) : (
      <View>
        <WordList
          words={this.state.words}
          refresh={this.refresh}
          refreshing={this.state.refreshing} />
      </View>
    )

    return (
      <View style={styles.container}>
        <StatusBarPadding />
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})