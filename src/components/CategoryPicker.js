import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
    Picker,
    Item as FormItem
} from "native-base"

const Item = Picker.Item

export default class CategoryPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'All'
    };
  }

  onSelect = category => {
    this.props.selectCategory(category)
    this.setState({ selected: category })
  }

  render() {
    renderCategories = this.props.categories.map(category => {
      return <Item
        label={category}
        value={category}
        key={category}/>
    })

    return (
      <Picker
        textStyle={styles.white}
        iosHeader='Category'
        mode='dropdown'
        selectedValue={this.state.selected}
        onValueChange={this.onSelect.bind(this)}
      >
        {renderCategories}
      </Picker>
    )
  }
}

const styles = StyleSheet.create({
  white:  {
    color: 'white'
  }
})