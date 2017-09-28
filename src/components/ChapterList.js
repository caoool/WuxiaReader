import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet
} from 'react-native'

import ChapterListItem from './ChapterListItem'

export default class ChapterList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.chapters}
        refreshing={this.props.refreshing}
        onRefresh={() => this.props.refresh()}
        renderItem={({item}) => (
          <ChapterListItem
            bookUrl={this.props.bookUrl}
            title={item.title}
            url={item.url}
            navigate={this.props.navigate}/>
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#021631'
  }
})