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
    lastRead = (item) => {
      if (item.user && item.user.lastRead)
        return <Text note style={styles.sub}>{item.user.lastRead.title}</Text>
      else return <View />
    }

    return (
      <FlatList
        data={this.props.books}
        refreshing={this.props.refreshing}
        onRefresh={() => this.props.refresh()}
        renderItem={({item}) => (
          <ListItem
            style={styles.row}
            onPress={() => this._onPress(item.title, item.url)}>
            {/* <Thumbnail
              square
              size={80}
              source={item.cover.url ? item.cover : require('../../public/no-cover-placeholder.png')}/> */}
            <Body>
              <Text style={styles.title}>{item.title}</Text>
              {/* <Text note style={styles.sub}>{item.lastChapter}</Text> */}
              {lastRead(item)}
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
    margin: 10,
    borderRadius: 12,
    borderColor: '#d6d7da',
    backgroundColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 1,
  },

  title: {
    marginLeft: 20,
    fontWeight: 'bold'
  },

  sub: {
    marginLeft: 20,
    fontSize: 12
  }
})