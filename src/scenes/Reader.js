import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native'
import { NavigationActions } from 'react-navigation'

import {
  Container,
  Header,
  Button,
  Icon,
  Left,
  Right
} from 'native-base'

import StatusBarPadding from '../components/StatusBarPadding'
import ReaderSettingsModal from '../components/ReaderSettingsModal'
import TranslationModal from '../components/TranslationModal'
import ContentViewer from '../components/ContentViewer'

import Loader from '../utils/Loader'
import UserManager from '../utils/UserManager'

export default class Reader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      url: this.props.navigation.state.params.url,
      title: this.props.navigation.state.params.title,
      nightMode: false
    }
  }

  async loadChapter() {
    const chapter = await Loader.loadChapter(this.props.navigation.state.params.url)
    this.setState({
      isLoading: false,
      chapter: chapter,
      wordToTranslate: ''
    })
  }

  async loadNextChapter(previous=false) {
    this.setState({ isLoading: true })
    const ret = await Loader.loadNextChapter(this.props.navigation.state.params.bookUrl, this.state.url, previous)
    if (ret) {
      this.setState({
        isLoading: false,
        chapter: ret.chapter,
        wordToTranslate: '',
        url: ret.url,
        title: ret.title
      })
    } else {
      this.setState({
        isLoading: false,
        wordToTranslate: ''
      })
    }
    UserManager.chapterRead(this.props.navigation.state.params.bookUrl, this.state.url, this.state.title)
  }

  changeSettings = () => {
    this.refs.readerSettingsModal.open()
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  loadNext = (previous=false) => {
    this.loadNextChapter(previous)
  }

  translate = (word) => {
    this.setState({ wordToTranslate: word })
  }

  componentDidMount() {
    this.loadChapter()
  }

  render() {
    let content = this.state.isLoading ? (
      <View style={styles.activityIndicator}>
        <ActivityIndicator />
      </View>
    ) : (
      <View style={styles.container}>
        <ReaderSettingsModal
          ref={'readerSettingsModal'}
          goBack={this.goBack}
          loadNext={this.loadNext}/>
        <TranslationModal
          ref={'translationModal'}
          wordToTranslate={this.state.wordToTranslate}/>
        <ContentViewer
          chapter={this.state.chapter}
          translate={this.translate}
          changeSettings={this.changeSettings}/>
      </View>
    )

    return (
      <View style={styles.container}>
        <StatusBarPadding/>
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