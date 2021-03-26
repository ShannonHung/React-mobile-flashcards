import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View } from 'react-native';
import { setLocalNotification } from './utils/notification';
import { createStore } from "redux";
import reducer from "./reducer";
import middleware from "./middleware";
import HomeScreen from './component/Home';
import Deck from './component/Deck';
import Decks from './component/Decks';
import { Provider } from 'react-redux';
import MainNavigator from './component/Navigation';

export default class App extends Component {

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        {/* <View style={styles.container} >
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
          <Decks />
        </View> */}
        <MainNavigator />
      </Provider>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
