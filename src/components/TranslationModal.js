import React, { Component } from 'react'
import { 
  ActivityIndicator,
  Text,
  StyleSheet,
  ScrollView,
  View
} from 'react-native'

import Modal from 'react-native-modalbox'

import CONSTANTS from '../constants'
import Loader from '../utils/Loader'

export default class TranslationModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      word: '',
      translation: {
        phonetic: '',
        definition: ''
      }
    }
  }

  open = () => {
    this.refs.modal.open()
  }

  loadTranslation = async () => {
    _wordToTranslate = this.props.wordToTranslate.replace(CONSTANTS.REGEX_PUNCTUATION,'')
    const translation = await Loader.loadTranslation(_wordToTranslate)
    this.setState({
      isLoading: false,
      word: _wordToTranslate,
      translation: translation
    })
  }

  onOpened = () => {
    this.loadTranslation()
  }

  onClosed = () => {
    this.setState({
      isLoading: false,
      word: '',
      translation: {
        phonetic: '',
        definition: ''
      }
    })
  }

  render() {
    return (
      <Modal
        style={styles.modal}
        ref={'modal'}
        position={'bottom'}
        animationDuration={100}
        swipeToClose={true}
        backdropPressToClose={true}
        onOpened={this.onOpened}
        onClosed={this.onClosed}>
        {this.state.isLoading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator />
          </View>
        ) : (
          <ScrollView>
            {this.state.translation.phonetic ? (
              <Text style={styles.wordToTranslate}>{this.state.word}{'    '}[{this.state.translation.phonetic}]</Text>
            ) : (
              <Text style={styles.wordToTranslate}>{this.state.word}</Text>
            )}
            <Text style={styles.translation}>{this.state.translation.definition}</Text>
          </ScrollView>
        )}
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal: {
    height: 200,
    padding: 25
  }, 

  wordToTranslate: {
    fontSize: 20,
    marginBottom: 25
  },

  translation: {
    fontSize: 18,
    lineHeight: 25
  }
})