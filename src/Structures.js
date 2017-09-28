import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation'

import {
  Button,
  Text,
  Icon,
  Footer,
  FooterTab
} from 'native-base'


import Meteor from 'react-native-meteor'

import CONSTANTS from './constants'

import Favorites from './scenes/Favorites'
import Glossary from './scenes/Glossary'
import Settings from './scenes/Settings'

import Catalog from './scenes/Catalog'
import Book from './scenes/Book'
import Reader from './scenes/Reader'


const FavoritesView = StackNavigator({
  Favorites: { screen: Favorites },
  Book: {
    screen: Book,
    navigationOptions: { tabBarVisible: false }
  },
  Reader: {
    screen: Reader,
    navigationOptions: { tabBarVisible: false }
  },
  Catalog: {
    screen: Catalog,
    navigationOptions: { tabBarVisible: false }
  }
}, {
  headerMode: 'none',
  cardStyle: {
    opacity: 1,
  }
})

const Tabs = TabNavigator({
  Glossary: {
    screen: Glossary,
    navigationOptions: {
      tabBarLabel:"Glossary",
      tabBarIcon: ({ tintColor }) => <Image
        source={require('assets/img/words.png')}
        style={[styles.iconMiddle, {tintColor: tintColor}]}/>
    }
  },
  Favorites: {
    screen: FavoritesView,
    navigationOptions: {
      tabBarLabel:"Favorites",
      tabBarIcon: ({ tintColor }) => <Image
        source={require('assets/img/shelf.png')}
        style={[styles.iconMiddle, {tintColor: tintColor}]}/>
    }
  },

  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel:"Settings",
      tabBarIcon: ({ tintColor }) => <Image
        source={require('assets/img/settings.png')}
        style={[styles.iconMiddle, {tintColor: tintColor}]}/>
    }
  }
}, {
  tabBarPosition: 'bottom',
  initialRouteName: 'Favorites',
  tabBarOptions: {
    activeTintColor: 'white',
    activeBackgroundColor: 'transparent',
    inactiveTintColor: 'grey',
    inactiveBackgroundColor: 'transparent',
    showLabel: true,
    showIcon: true,
    style: { backgroundColor: '#021631' },
    labelStyle: { borderWidth: 0 },
    tabStyle: { borderWidth: 0 }
  },
})

export default class Entry extends Component {
  componentWillMount() {
    Meteor.connect(CONSTANTS.SERVER_URL);
  }

  render() {
    return <Tabs />
  }
}

const styles = StyleSheet.create({
  iconMiddle: {
    width: 25,
    height: 25,
    marginBottom: 0,
  },
});