import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native'
import { NavigationActions } from 'react-navigation'

import {
  Container,
  Header,
  Body,
  Button,
  Title,
  Left,
  Right,
  Icon,
  Input,
  Item,
  Picker,
  Text
} from 'native-base'

import MyStatusBar from '../components/MyStatusBar'
import CategoryBar from '../components/CategoryBar'
import CategoryPicker from '../components/CategoryPicker'
import BookList from '../components/BookList'

import Loader from '../utils/Loader'

export default class Catalog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      refreshing: true,
      catalog: {}
    }
  }

  async loadCatalog(refresh=false) {
    const catalog = await Loader.getCatalog(refresh)
    this.setState({
      isLoading: false,
      refreshing: false,
      catalog: catalog,
      selectedCategory: Object.keys(catalog)[0],
      books: catalog[Object.keys(catalog)[0]]
    })
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  refresh = () => {
    this.setState({ refreshing: true })
    this.loadCatalog(true)
  }

  selectCategory = (category) => {
    this.setState({
      selectedCategory: category,
      books: this.state.catalog[category]
    })
  }

  queryChanged = (query) => {
    books = this.state.catalog[this.state.selectedCategory].filter(
      book => book.title.includes(query)
    )
    this.setState({ books: books })
  }

  componentDidMount() {
    this.loadCatalog()
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
        <Header rounded searchBar
          style={styles.header}>
          <MyStatusBar
            backgroundColor="#021631"
            barStyle="light-content" />
          <Left style={styles.left}>
            <Button transparent
              style={styles.backButton}
              onPress={() => this.goBack()}>
              <Icon
                style={styles.white}
                name='arrow-back' />
            </Button>
          </Left>
          <Item style={styles.middle}>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChangeText={this.queryChanged.bind(this)}/>
          </Item>
          <Right style={styles.right}>
            <CategoryPicker
              selectCategory={this.selectCategory}
              categories={Object.keys(this.state.catalog)}/>
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

  white:  {
    color: 'white'
  },

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  left: {
    flex: 1
  },

  middle: {
    flex: 5
  },

  right: {
    flex: 1
  },

  backButton: {
    marginRight: 10
  },

  backButtonIcon: {
    color: 'white'
  },

  bookList: {
    flex: 1,
    backgroundColor: '#021631'
  }
})