import React, { Component } from 'react'
import { 
  ActivityIndicator,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions
} from 'react-native'

import {
  Button,
  H1,
  Icon
} from 'native-base'

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

  loadTranslation = async (data) => {
    const translation = await Loader.loadTranslation(data)
    this.setState({
      isLoading: false,
      word: data,
      translation: translation
    })
  }

  onOpened = () => {
    this.loadTranslation(this.props.wordToTranslate)
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

  componentWillReceiveProps(nextProps) {
    this.loadTranslation(nextProps.wordToTranslate)
  }

  render() {
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
        {this.state.isLoading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator />
          </View>
        ) : (
          <View>
            <View style={styles.functionRow}>
              <Button 
                style={styles.starButton}
                transparent>
                <Icon
                  style={styles.starIcon}
                  name='md-star-outline'/>
                <Text>
                  <Text style={styles.starNumberCount}>{'500'}</Text>
                  <Text style={styles.starNumberDecorator}>{'    ♥ᔕTᗩᖇᔕ♥'}</Text>
                  <Text style={styles.totalCountNumber}>{'\n3000 look ups'}</Text>
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