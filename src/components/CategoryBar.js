import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import ScrollingMenu from 'react-native-scrolling-menu'

export default class CategoryBar extends Component {
  constructor(props) {
    super(props)
  }

  onClick(itemIndex) {
    this.props.selectCategory(this.props.categories[itemIndex])
  }

  render() {
    return (
      <ScrollingMenu
        items={this.props.categories}
        callback={this.onClick.bind(this)}
        selectedTextColor='#000000'
        itemSpacing={30}
      />
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 0,
  },

  menu: {
    fontSize: 20
  }
})
