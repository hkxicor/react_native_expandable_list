/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';


export default class altiore extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.textBig}>Projected Returns</Text>
      </ScrollView>
    )
  }

}


var styles = StyleSheet.create({
  container: {
    flex            : 1,
    backgroundColor : '#39007B',
    paddingTop      : 40
  },
  textBig: {
    marginLeft:20,
    color:'#fff',
    fontSize:20,
    fontWeight:'600'
  }

});


AppRegistry.registerComponent('altiore', () => altiore);
