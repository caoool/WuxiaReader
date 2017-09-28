import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

import Meteor, { createContainer } from 'react-native-meteor'

import {
  Button,
  H1,
  Icon
} from 'native-base'

import Hr from 'react-native-hr'

import Loader from '../utils/Loader'

class WordItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isFaved: false,
      translation: {
        phonetic: '',
        definition: ''
      }
    }
  }

  loadTranslation = async (word) => {
    const translation = await Loader.loadTranslation(word)
    this.setState({
      isLoading: false,
      translation: translation
    })
  }

  componentDidMount() {
    this.loadTranslation(this.props.item.word)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.wordSection}>
            <H1>{this.props.item.word}</H1>
            <View>
              <Text style={styles.count}>★{'\t'+this.props.fav}</Text>
              <Text style={styles.count}>◉{'\t'+this.props.count}</Text>
            </View>
          </View>
          <Hr lineColor={'lightgrey'}/>
          <View style={styles.definitionSection}>
            {this.state.isLoading ? (
              <View style={styles.activityIndicator}>
                <ActivityIndicator />
              </View>
            ) : (
              <View>
                {this.state.translation.phonetic ? (
                  <View>
                    <Text style={styles.phonetic}>
                      [{this.state.translation.phonetic}]{'    '}
                      <Icon style={styles.mic} name={'md-mic'}/>
                    </Text>
                  </View>
                ) : (
                  <View></View>
                )}
                <Text style={styles.translation}>{this.state.translation.definition}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    )
  }
}

export default createContainer(props => {
  const word = props.item.word
  Meteor.subscribe('vocabulary.word', word)
  const item = Meteor.collection('vocabulary').findOne({ word: word })
  count = item ? item.count : 0
  fav = item ? item.fav : 0
  return {
    count: count,
    fav: fav
  }
}, WordItem)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  row: {
    margin: 10,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },

  wordSection: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  count: {
    color: 'grey'
  },

  hr: {
    height: 5
  },

  definitionSection: {
    padding: 10,
    minHeight: 50
  },

  mic: {
    fontSize: 18,
    // color: 'blue'
  },

  phonetic: {
    marginBottom: 20
  },

  translation: {
    lineHeight: 20
  }
})