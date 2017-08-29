import React, { Component } from 'react'
import {
  FlatList
} from 'react-native'

import ChapterListItem from './ChapterListItem'

export default class ChapterList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <FlatList
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