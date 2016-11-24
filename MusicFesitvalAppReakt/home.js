/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  TouchableHighlight,
  Navigator
} from 'react-native';

export default class Home extends Component{

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
    this.state ={
      dataSource:ds.cloneWithRows(['Kings of Leon', 'Queen', 'Scorpions', 'Dub FX', 'The xx'])
    };
  }

  render() {
    return(
      <View style={styles.list}>
      <ListView
        dataSource = {this.state.dataSource}
        renderRow = { (rowData)=>
          <Text style={styles.text}>
            {rowData}
          </Text> } 
      />
      </View>
    );}
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  text:{
    fontSize:15,
  }
})

AppRegistry.registerComponent('Home', () => Home);