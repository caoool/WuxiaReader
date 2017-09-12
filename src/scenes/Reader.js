import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
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

  toggleNightMode = () => {
    this.setState({nightMode: !this.state.nightMode})
    console.log(this.state.nightMode)
  }

  translate = (word) => {
    this.setState({ wordToTranslate: word })
    this.refs.modal.open()
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
      <Container>
        <TranslationModal
          ref={'modal'}
          wordToTranslate={this.state.wordToTranslate}/>
        <ContentViewer
          chapter={this.state.chapter}
          translate={this.translate}
          nightMode={this.state.nightMode}/>
      </Container>
    )

    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
              <Icon style={{color: 'black'}} name='arrow-back' />
            </Button>
          </Left>
          <Right>
            <Button danger transparent
              onPress={() => this.loadNextChapter(true)}>
              <Icon style={{color: 'black'}} name='arrow-back' />
              <Text> Prev</Text>
            </Button>
            <Button info transparent
              onPress={() => this.loadNextChapter()}>
              <Text>Next </Text>
              <Icon style={{color: 'black'}} name='arrow-forward' />
            </Button>
          </Right>
        </Header>
        {content}
      </Container>
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