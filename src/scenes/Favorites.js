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
  Button,
  Icon,
  Body,
  Right,
  Title
} from 'native-base'

import MyStatusBar from '../components/MyStatusBar'
import BlankPlaceholder from '../components/BlankPlaceholder'
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
    this.setState({ refreshing: true })
    this.loadFavorites()
  }

  componentDidMount() {
    this.loadFavorites()
  }

  render() {
    let content = this.state.isLoading ? (
      <View style={styles.activityIndicator}>
        <ActivityIndicator />
      </View>
    ) : (
      <View style={styles.bookList}>
        {!this.state.books &&
          <BlankPlaceholder />
        }
        <BookList
          books={this.state.books}
          navigate={this.props.navigation.navigate}
          refresh={this.refresh}
          refreshing={this.state.refreshing}/>
      </View>
    )

    return (
      <Container>
        <MyStatusBar
          backgroundColor="#021631"
          barStyle="light-content" />
        <Header style={styles.header}>
          <Body>
            <Title style={styles.text}>My Favorites</Title>
          </Body>
          <Right style={{borderWidth: 0}}>
            <Button transparent
              onPress={() => this.props.navigation.navigate('Catalog')}>
              <Icon style={styles.text} name='md-add' />
            </Button>
          </Right>
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

  header: {
    backgroundColor: '#021631',
    borderBottomWidth: 0
  },

  text:  {
    color: 'white'
  },

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  bookList: {
    flex: 1,
    backgroundColor: '#021631'
  }
})