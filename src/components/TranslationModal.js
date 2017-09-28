import React, { Component } from 'react'
import { 
  ActivityIndicator,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions
} from 'react-native'

import Meteor, { createContainer } from 'react-native-meteor'

import {
  Button,
  H1,
  Icon
} from 'native-base'

import Modal from 'react-native-modalbox'

import CONSTANTS from '../constants'
import Loader from '../utils/Loader'
import UserManager from '../utils/UserManager'

class TranslationModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      word: '',
      isFaved: false,
      translation: {
        phonetic: '',
        definition: ''
      }
    }
  }

  initalSetup = async (wordToTranslate) => {
    const word = wordToTranslate.trim()
    this.loadTranslation(word)
    this.addCount(word)
    const isFaved = await UserManager.checkWord(word)
    this.setState({ isFaved: isFaved })
  }

  open = () => {
    this.refs.modal.open()
  }

  addCount = (word) => {
    console.log('addCount')
    Meteor.call('vocabulary.addCount', { word })
  }

  addFav = (word) => {
    if (this.state.isFaved) { return }
    console.log('addFav')
    UserManager.saveWord(word)
    Meteor.call('vocabulary.addFav', { word })
    this.setState({ isFaved: true })
    console.log(UserManager.getWords())
  }

  loadTranslation = async (word) => {
    const translation = await Loader.loadTranslation(word)
    this.setState({
      isLoading: false,
      word: word,
      translation: translation
    })
  }

  onOpened = () => {}

  onClosed = () => {
    this.setState({
      isLoading: true,
      word: '',
      ifFaved: false,
      translation: {
        phonetic: '',
        definition: ''
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.wordToTranslate) { return }
    if (nextProps.wordToTranslate == this.props.wordToTranslate) { return }
    this.open()
    this.initalSetup(nextProps.wordToTranslate)
  }

  render() {
    let content = this.state.isLoading ? (
      <View style={styles.activityIndicator}>
        <ActivityIndicator />
      </View>
    ) : (
      <View>
        <View style={styles.functionRow}>
          <Button transparent
            style={styles.starButton}
            onPress={() => this.addFav(this.state.word)}>
            {this.state.isFaved ? (
              <Icon
                style={styles.starIcon}
                name='md-star'/>
            ) : (
              <Icon
                style={styles.starIcon}
                name='md-star-outline'/>
            )}
            <Text>
              <Text style={styles.starNumberCount}>{this.props.fav}</Text>
              <Text style={styles.starNumberDecorator}>{'    ♥ᔕTᗩᖇᔕ♥'}</Text>
              <Text style={styles.totalCountNumber}>{'\n' + this.props.count + ' look ups'}</Text>
            </Text>
          </Button>
          <Button style={styles.languageButton} bordered light small>
            <Text style={styles.languageButtonText}>ENG - CHN  </Text>
            <Icon name='md-arrow-dropdown' />
          </Button>
        </View>
        <ScrollView style={styles.translationArea}>
          {this.state.translation.phonetic ? (
            <View>
              <H1 style={styles.wordToTranslate}>{this.state.word}</H1>
              <Text style={styles.phonetic}>
                [{this.state.translation.phonetic}]{'    '}
                <Icon style={styles.mic} name={'md-mic'}/>
              </Text>
            </View>
          ) : (
            <Text style={styles.wordToTranslate}>{this.state.word}</Text>
          )}
          <Text style={styles.translation}>{this.state.translation.definition}</Text>
        </ScrollView>
      </View>
    )

    return (
      <Modal
        style={styles.modal}
        ref={'modal'}
        position={'bottom'}
        animationDuration={100}
        swipeToClose={true}
        swipeArea={100}
        backdropOpacity={0.3}
        backdropPressToClose={true}
        onOpened={this.onOpened}
        onClosed={this.onClosed}>
        {content}
      </Modal>
    )
  }
}

export default createContainer(props => {
  const word = props.wordToTranslate.trim()
  Meteor.subscribe('vocabulary.word', word)
  const item = Meteor.collection('vocabulary').findOne({ word: word })
  count = item ? item.count : '-'
  fav = item ? item.fav : '-'
  return {
    count: count,
    fav: fav
  }
}, TranslationModal)

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal: {
    height: Dimensions.get('window').height * 0.5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 1,
  }, 

  // function row
  functionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  starButton: {
    marginTop: 15
  },

  starIcon: {
    color: 'gold',
    fontSize: 50,
    marginTop: 15
  },

  starNumberCount: {
    color: 'dimgrey',
    fontSize: 21
  },

  starNumberDecorator: {
    color: 'dimgrey',
    fontSize: 12
  },

  totalCountNumber: {
    color: 'dimgrey',
    fontSize: 12
  },

  languageButton: {
    marginTop: 28,
    marginRight: 15
  },

  languageButtonText: {
    color: 'dimgrey',
    fontSize: 15
  },

  // translation area
  translationArea: {
    marginTop: 20,
    padding: 20
  },

  wordToTranslate: {
    // fontSize: 27,
    marginBottom: 30
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