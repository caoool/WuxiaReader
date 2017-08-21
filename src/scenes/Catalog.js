import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native'

import CategoryBar from '../components/CategoryBar'
import BookList from '../components/BookList'

import Loader from '../utils/Loader'

export default class Catalog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      catalog: {}
    }
  }

  static navigationOptions = {
    title: 'Catalog'
  }

  async loadCatalog() {
    const catalog = await Loader.getCatalog()
    this.setState({
      isLoading: false,
      catalog: catalog,
      selectedCategory: Object.keys(catalog)[0]
    })
  }

  selectCategory = (category) => {
    this.setState({
      selectedCategory: category
    })
  }

  componentDidMount() {
    this.loadCatalog()
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
        <View style={styles.categoryBar}>
          <CategoryBar
            selectCategory={this.selectCategory}
            categories={Object.keys(this.state.catalog)}
          />
        </View>
        <View style={styles.bookList}>
          <BookList
            books={this.state.catalog[this.state.selectedCategory]}
            navigate={this.props.navigation.navigate}/>
        </View>
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
  },

  bookList: {
    flex: 1
  }
})