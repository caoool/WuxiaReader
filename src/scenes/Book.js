import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native'
import { NavigationActions } from 'react-navigation'

import {
  Container,
  Header,
  Left,
  Right,
  Button,
  Icon,
  Text
} from 'native-base'

import BookDetails from '../components/BookDetails'
import ChapterList from '../components/ChapterList'

import Loader from '../utils/Loader'
import UserManager from '../utils/UserManager'

export default class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      refreshing: true,
      favorited: false
    }
  }

  async loadBook(refresh=false) {
    const book = await Loader.loadBook(this.props.navigation.state.params.url, this.props.navigation.state.params.title, refresh)
    const favorited = book.user ? book.user.favorited : false
    this.setState({
      isLoading: false,
      refreshing: false,
      book: book,
      favorited: favorited
    })
  }

  refresh = () => {
    console.log('refreshing')
    this.setState({ refreshing: true })
    this.loadBook(true)
  }

  downloadBook = () => {
    console.log('waiting')
  }

  async toggleFavorite() {
    let result = null
    const found = await UserManager.isFavorited(this.state.book.details.url)
    if (found) {
      result = await UserManager.removeFromFavorite(this.state.book.details.url)
      if (result) { this.setState({ favorited: !result }) }
    } else {
      result = await UserManager.addToFavorite(this.state.book)
      if (result) { this.setState({ favorited: result }) }
    }
  }

  continueReading = () => {
    if (this.state.book.user && this.state.book.user.lastRead) {
      this.props.navigation.navigate('Reader', {
        title: this.state.book.user.lastRead.title,
        url: this.state.book.user.lastRead.url,
        bookUrl: this.state.book.details.url
      })
    } else {
      this.props.navigation.navigate('Reader', {
        title: this.state.book.chapters[0].title,
        url: this.state.book.chapters[0].url,
        bookUrl: this.state.book.details.url
      })
    }
  }

  componentDidMount() {
    this.loadBook()
  }

  render() {
    let content = this.state.isLoading ? (
      <View style={styles.activityIndicator}>
        <ActivityIndicator />
      </View>
    ) : (
      <Container>
        <BookDetails
          user={this.state.book.user}
          details={this.state.book.details}/>
        <ChapterList
          bookUrl = {this.state.book.details.url}
          chapters={this.state.book.chapters}
          refresh={this.refresh}
          refreshing={this.state.refreshing}
          navigate={this.props.navigation.navigate}/>
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
            {/* <Button dark transparent
              onPress={() => this.downloadBook()}>
              <Icon name='md-download' />
            </Button> */}
            <Button danger transparent
              onPress={() => this.toggleFavorite()}>
              <Icon name={this.state.favorited ? 'md-heart' : 'md-heart-outline'} />
            </Button>
            <Button info transparent
              onPress={() => this.continueReading()}>
              <Icon name='md-book' />
            </Button>
          </Right>
        </Header>
        {content}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent'
  },

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})