import React, { Component } from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'

import {
  Button,
  Text,
  Icon,
  Footer,
  FooterTab
} from 'native-base'

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
  }
}, {
  headerMode: 'none'
})

const CatalogView = StackNavigator({
  Catalog: { screen: Catalog },
  Book: {
    screen: Book,
    navigationOptions: { tabBarVisible: false }
  },
  Reader: { 
    screen: Reader,
    navigationOptions: { tabBarVisible: false }
  }
}, {
  headerMode: 'none'
})

const Tabs = TabNavigator({
  Favorites: { screen: FavoritesView },
  CatalogView: { screen: CatalogView },
  Glossary: { screen: Glossary },
  Settings: { screen: Settings }
}, {
  tabBarPosition: 'bottom',
  tabBarComponent: props => {
    return (
      <Footer>
        <FooterTab>
          <Button
            vertical
            active={props.navigationState.index === 0}
            onPress={() => props.navigation.navigate('Favorites')}>
            <Icon name='heart' />
            <Text>Favorites</Text>
          </Button>
          <Button
            vertical
            active={props.navigationState.index === 1}
            onPress={() => props.navigation.navigate('CatalogView')}>
            <Icon name="md-globe" />
            <Text>Catalog</Text>
          </Button>
          <Button
            vertical
            active={props.navigationState.index === 2}
            onPress={() => props.navigation.navigate('Glossary')}>
            <Icon name="md-list" />
            <Text>Glossary</Text>
          </Button>
          <Button
            vertical
            active={props.navigationState.index === 3}
            onPress={() => props.navigation.navigate('Settings')}>
            <Icon name="md-settings" />
            <Text>Settings</Text>
          </Button>
        </FooterTab>
      </Footer>
    ) 
  }
})

export default class Entry extends Component {
  render() {
    return <Tabs />
  }
}



