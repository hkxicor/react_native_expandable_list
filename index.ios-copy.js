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
import ExpandableList from './src/components/ExpandableList';
import values from './src/data/data';

export default class altiore extends Component {
  render() {
    var RenderList = [];
    var ColorRange = this._setColorRange(values);
    Object.keys(values).map( (key, index) => {
      let styleClass;
      if(values[key]._figure === null){
        styleClass = 'RED'
        value = 0;
      }
      else if(this.between(values[key]._figure[0],ColorRange[0][0],ColorRange[0][1])){
        styleClass = 'RED'
      }else if(this.between(values[key]._figure[0],ColorRange[1][0],ColorRange[1][1])){
        styleClass = 'YELLOW'
      }else{
        styleClass = 'GREEN'
      }
      RenderList.push(<ExpandableList title={key} color={styleClass} value={values[key]._figure} list={values[key]}></ExpandableList>)
    });
    return (
      <ScrollView style={styles.container}>
        {RenderList}
     </ScrollView>
    );
  }
  _setColorRange(data){
    var min = 100;
    var max = 0;
    var range = []
    Object.keys(data).map( (key, index) => {

        min = min > data[key]._figure[0] ? data[key]._figure[0]: min;
        max = max < data[key]._figure[0] ? data[key]._figure[0]: max;
    });

    let total_length = max-min;
    let subrange_length = total_length/3;
    var current_start = min;

    for (var i = 0; i < 3; ++i) {
      range.push([current_start,(current_start + subrange_length)])
      current_start += subrange_length;
    }

    return range
}
between(x, min, max) {
  return x >= min && x <= max;
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
