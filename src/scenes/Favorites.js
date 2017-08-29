import React, { Component } from 'react'
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet
} from 'react-native'

import {
  Container,
  Header,
  Body,
  Title
} from 'native-base'

import BookList from '../components/BookList'

import UserManager from '../utils/UserManager'

export default class Favorite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      refreshing: true,
      books: []
    }
  }

  async loadFavorites() {
    const favorites = await UserManager.loadFavorites()
    this.setState({
      isLoading: false,
      refreshing: false,
      books: favorites
    })
  }

  refresh = () => {
    console.log('refreshing')
    this.setState({ refreshing: true })
    this.loadFavorites()
  }

  componentDidMount() {
    this.loadFavorites()
  }

  componentWillFocus() {
    console.log('hahaha')
    this.loadFavorites()
  }

  render() {
    let content = this.state.isLoading ? (
      <View style={styles.activityIndicator}>
        <ActivityIndicator />
      </View>
    ) : (
      <View style={styles.bookList}>
        <BookList
          books={this.state.books}
          navigate={this.props.navigation.navigate}
          refresh={this.refresh}
          refreshing={this.state.refreshing}/>
      </View>
    )

    return (
      <Container>
        <Header>
          <Body>
            <Title>My Favorites</Title>
          </Body>
        </Header>
        <View style={styles.container}>
          {content}
        </View>
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
  },

  bookList: {
    flex: 1
  }
})