import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native'

import StatusBarPadding from './StatusBarPadding'

export default class ContentViewer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    renderRow = (paragraph) => {
      return paragraph.map((word, i) => {
        return (
          <Text
            key={i}
            style={styles.word}
            onLongPress={() => {
              _word = paragraph[i]
              if (!_word.match(/[a-z]/i)) { return }
              this.props.translate(_word)
            }}>
            {word + ' '}
          </Text>
        )
      })
    }
  
    renderChapter = () => {
      return (
        <View>
          <FlatList
            style={styles.view}
            data={this.props.chapter.content}
            renderItem={({item}) => (
              <View style={styles.row}>
                <Text style={styles.word}>
                  {renderRow(item.paragraph)}
                </Text>
              </View>
            )}
          />
        </View>
      )
    }

    return renderChapter()
  }
}

const styles = StyleSheet.create({
  view: {
  },

  content: {
    margin: 30
  },

  row: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20
  },

  word: {
    fontSize: 18,
    textAlign: 'justify',
    lineHeight: 30,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})