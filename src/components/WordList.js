import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native'

import WordItem from './WordItem'

export default class WordList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    renderItem = ({ item }) => (
      <WordItem item={item} />
    )

    return (
      <FlatList
        data={this.props.words}
        onRefresh={() => this.props.refresh()}
        refreshing={this.props.refreshing}
        renderItem={renderItem}
      />
    )
  }
}

const styles = StyleSheet.create({
  row: {
    margin: 10,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },

  wordSection: {
    padding: 10
  },

  hr: {
    height: 5
  },

  definitionSection: {
    padding: 10
  }
})