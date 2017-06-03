
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';
import ExpandableList from './src/components/ExpandableList';
import values from './src/data/data';

export default class altiore extends Component {
  render() {
    var RenderList = [];
    Object.keys(values).map( (key, index) => {
      RenderList.push(<ExpandableList title={key} value={values[key]._figure} list={values[key]}></ExpandableList>)
    });
    return (
      <ScrollView style={styles.container}>
        {RenderList}
     </ScrollView>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex            : 1,
    backgroundColor : '#FF8A00',
    paddingTop      : 40
  },

});


AppRegistry.registerComponent('altiore', () => altiore);
