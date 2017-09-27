import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  WebView,
  TouchableWithoutFeedback
} from 'react-native'

import StatusBarPadding from './StatusBarPadding'

let pre = `
<!DOCTYPE html>\n
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style>
    div.fixed {
      position: fixed;
      top: 0px;
      left: -100px;
      right: -100px;
      height: 10%;
    }
    </style>
  </head>
<body>
  <div class='fixed' id='launchSettingClickable'></div>
`
let post = `
<script>
  userHasScrolled = false;
  window.onscroll = function (e)
  {
      userHasScrolled = true;
  }
  document.addEventListener("selectionchange", function() {
    window.postMessage(window.getSelection())
  });
  document.addEventListener("touchstart", function() {
    userHasScrolled = false;
  });
  document.getElementById("launchSettingClickable").addEventListener("touchend", function(){
    if (userHasScrolled) { return }
    if (window.getSelection() != '') { return }
    window.postMessage("launchSettingsModal")
  });
</script>
</body>
</html>
`

export default class ContentViewer extends Component {
  constructor(props) {
    super(props)
  }

  _hook = (data) => {
    if (data) {
      if (data == 'launchSettingsModal') {
        this.props.changeSettings()
      } else {
        this.props.translate(data)
      }
    }
  }

  render() {
    return (
      <WebView
        source={{html: pre + this.props.chapter.content + post}}
        onMessage={(event) => this._hook(event.nativeEvent.data)} />
    )
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white'
  },

  row: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start',
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20
  },

  rowNight: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'flex-start',
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20
  },

  word: {
    color: 'black',
    fontSize: 18,
    textAlign: 'justify',
    lineHeight: 30,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  wordNight: {
    color: 'white',
    fontSize: 18,
    textAlign: 'justify',
    lineHeight: 30,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})