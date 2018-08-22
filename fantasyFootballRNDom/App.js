/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HomeScreen from './screens/homeScreen';
import { Container, Content, H1, Thumbnail, List, ListItem, Left, Right, Body, Button, H3 } from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super()
      this.state = {
        lastMessageText: '',
        leagueName: '',
        league_id: '337621871191146496',
        lastMessageAttachment: '',
        lastMessageAuthor: '',
        lastMessageAuthorAvatar: '',
    }
  }
  componentDidMount() {
    fetch('https://api.sleeper.app/v1/user/337271354535448576/leagues/nfl/2018', {
      headers: {
        'Access-Control-Allow-Origin': '*',  
      },
      mode: "no-cors",
    })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      console.log(res);
      this.setState({
        lastMessageText: res[0].last_message_text,
        leagueName: res[0].name,
        lastMessageAuthor: res[0].last_author_display_name,
        lastMessageAuthorAvatar: res[0].last_author_avatar,
      });
    });
  }
  render() {
    const lastAuthorAvatarURI = `https://sleepercdn.com/avatars/thumbs/15a3ee50097{this.state.lastMessageAuthorAvatar}`;
    return (
      <Content contentContainerStyle={{ flexDirection: 'column', paddingTop: 20 }}>
        <View style={{ alignItems: 'center', paddingVertical: 20 }}>
            <H1>{this.state.leagueName}</H1>
            <H3>Most Recent Update</H3>
          </View>
            <View style={{ justifyContent: 'center', paddingHorizontal: 10}}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={{ uri: lastAuthorAvatarURI }} />
                </Left>
                <Body>
                  <Text>{this.state.lastMessageAttachment}</Text>
                  <Text note numberOfLines={1}>{this.state.lastMessageText}</Text>
                </Body>
              </ListItem>
            </View>
        <HomeScreen />
      </Content>
    );
  }
}

