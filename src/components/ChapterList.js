import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class ChapterList extends Component {
  constructor(props) {
    super(props)
  }

  onPress = (title, url) => {
    this.props.navigate('Reader', {
      title: title,
      url: url
    })
  }

  render() {
    return (
      <FlatList
        data={this.props.chapters}
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text
              style={styles.chapterTitle}
              onPress={() => this.onPress(item.title, item.url)}>
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
  
  chapterTitle: {
    fontSize: 16
  }
})