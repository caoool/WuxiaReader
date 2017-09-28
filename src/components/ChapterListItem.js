import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import {
  Text,
  Icon,
  ListItem,
  Body,
  Right
} from 'native-base'

import UserManager from '../utils/UserManager'

export default class ChapterListItem extends Component {
  constructor(props) {
    super(props)
    this.state = { read: false }
  }

  async checkRead() {
    const read = await UserManager.checkRead(this.props.url)
    this.setState({ read: read })
  }

  onPress = (title, url) => {
    UserManager.chapterRead(this.props.bookUrl, url, title)
    this.props.navigate('Reader', {
      bookUrl: this.props.bookUrl,
      title: title,
      url: url
    })
  }

  componentWillMount() {
    this.checkRead()
  }

  render() {
    return (
      <ListItem
        style={styles.row}
        onPress={() => this.onPress(this.props.title, this.props.url)}>
        <Body>
          <Text
            style={styles.text}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {this.props.title}
          </Text>
        </Body>
        <Right>
          <Icon
            style={styles.icon}
            name='arrow-forward' />
        </Right>
      </ListItem>
    )
  }
}

const styles = StyleSheet.create ({
  text: {
    flex: 1,
    fontSize: 15,
    marginRight: 20
  },

  row: {
    padding: 12,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey'
  },

  icons: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },

  icon: {
    color: 'grey',
    fontSize: 16
  }
})