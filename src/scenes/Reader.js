import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native'

import TranslationModal from '../components/TranslationModal'
import ContentViewer from '../components/ContentViewer'

import Loader from '../utils/Loader'

export default class Reader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    // header: null
  })

  async loadChapter() {
    const chapter = await Loader.loadChapter(this.props.navigation.state.params.url)
    this.setState({
      isLoading: false,
      chapter: chapter,
      wordToTranslate: ''
    })
  }

  translate = (word) => {
    this.setState({ wordToTranslate: word })
    this.refs.modal.open()
  }

  componentDidMount() {
    this.loadChapter()
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
        <TranslationModal
          ref={'modal'}
          wordToTranslate={this.state.wordToTranslate}/>
        <ContentViewer
          chapter={this.state.chapter}
          translate={this.translate}/>
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