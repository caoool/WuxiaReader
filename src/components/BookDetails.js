import React, { Component } from 'react'
import {
  Image,
  View,
  StyleSheet,
} from 'react-native'

import { 
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Title,
  Segment,
  Subtitle,
  Button,
  Icon,
  Item,
  Left,
  Right,
  Body
} from 'native-base'

export default class BookDetails extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    lsetRead = () => {
      if (this.props.user && this.props.user.lastRead)
        return this.props.user.lastRead.title
      else return 'New, never read before'
    }

    return (
      <CardItem
        style={styles.details}
        bordered={true}>
        <Left>
          {this.props.details.cover.url ? (
            <Thumbnail
              square
              large
              source={this.props.details.cover} />
          ) : (<Text></Text>)}
          <Body>
            <Text style={styles.title}>{this.props.details.title}</Text>
            <Text
              style={styles.sub}
              numberOfLines={5}
              ellipsizeMode={'tail'}>
              {this.props.details.description}
            </Text>
            <View style={styles.inline}>
              <Icon style={styles.icon} name='md-eye' />
              <Text
                style={styles.note}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {lsetRead()}
              </Text>
            </View>
          </Body>
        </Left>
      </CardItem>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  details: {
    flex: 0,
    paddingBottom: 15,
    backgroundColor: 'white'
  },

  inline: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 15,
    marginTop: 20
  },

  icon: {
    flex: 0,
    fontSize: 14
  },

  title: {
    margin: 15,
    marginRight: 5,
    fontSize: 24,
    fontWeight: 'bold',
    
  },

  sub: {
    margin: 15,
    marginTop: 0,
    marginBottom: 0,
    marginRight: 8,
    color: 'grey',
    fontSize: 12
  },

  note: {
    flex: 1,
    marginLeft: 15,
    fontSize: 12,
    color: 'grey'
  }
})