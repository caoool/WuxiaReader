import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text
} from 'react-native'

import ChapterList from '../components/ChapterList'

import Loader from '../utils/Loader'

export default class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })

  async loadChapters() {
    const chapters = await Loader.getChapters(this.props.navigation.state.params.url)
    this.setState({
      isLoading: false,
      chapters: chapters
    })
  }

  componentDidMount() {
    this.loadChapters()
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ChapterList
          chapters={this.state.chapters}
          navigate={this.props.navigation.navigate}/>
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