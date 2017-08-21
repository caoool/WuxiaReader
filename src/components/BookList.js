import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class BookList extends Component {
  constructor(props) {
    super(props)
  }

  _onPress = (title, url) => {
    this.props.navigate('Book', {
      title: title,
      url: url
    })
  }

  render() {
    return (
      <FlatList
        data={this.props.books}
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text
              style={styles.bookTitle}
              onPress={() => this._onPress(item.title, item.url)}>
              {item.title}
            </Text>
          </View>
        )}
      />
    )
  }
}

const styles = StyleSheet.create ({
  row: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20
  },

  bookTitle: {
    fontSize: 16
  }
})