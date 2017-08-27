import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native'

import {
  Body,
  ListItem,
  Text,
  Thumbnail,
  Right,
  Icon
} from 'native-base'

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
        refreshing={this.props.refreshing}
        onRefresh={() => this.props.refresh()}
        renderItem={({item}) => (
          <ListItem
            style={styles.row}
            onPress={() => this._onPress(item.title, item.url)}>
            <Thumbnail
              square
              size={80}
              source={item.cover.url? item.cover : require('../../public/no-cover-placeholder.png')}/>
            <Body>
              <Text>{item.title}</Text>
              <Text note>{item.description}</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        )}
      />
    )
  }
}

const styles = StyleSheet.create ({
  row: {
  }
})