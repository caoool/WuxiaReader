import React, { Component } from 'react'
import { 
  ActivityIndicator,
  Text,
  StyleSheet,
  ScrollView,
  View
} from 'react-native'

import {
  Button,
  Icon
} from 'native-base'

import Modal from 'react-native-modalbox'

export default class ReaderSettingsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  open = () => {
    this.refs.modal.open()
  }

  render() {
    let content = (
      <View style={styles.actionRow}>
        <Button iconLeft transparent small
          style={styles.actionButton}
          onPress={() => this.props.goBack()}>
          <Icon style={styles.buttonIcon} name='arrow-back' />
        </Button>
        <Button iconLeft transparent small
          style={styles.actionButton}
          onPress={() => console.log('chapters')}>
          <Icon style={styles.buttonIcon}  name='md-menu' />
        </Button>
        <Button iconLeft transparent small
          style={styles.actionButton}
          onPress={() => this.props.loadNext(true)}>
          <Icon style={styles.buttonIcon}  name='md-return-left' />
        </Button>
        <Button iconLeft transparent small
          style={styles.actionButton}
          onPress={() => this.props.loadNext()}>
          <Icon style={styles.buttonIcon}  name='md-return-right' />
        </Button>
      </View>
    )

    return (
      <Modal
        style={styles.modal}
        ref={'modal'}
        position={'top'}
        entry={'top'}
        animationDuration={100}
        swipeToClose={true}
        backdropPressToClose={true}>
        {content}
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    height: 'auto',
    paddingTop: 10,
    paddingBottom: 10
  },

  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  actionButton: {
  },

  buttonIcon: {
    color: 'black'
  }
})