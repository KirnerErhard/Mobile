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
  Alert,
  Navigator
} from 'react-native';
import realm from './Model/model';
import PieChart from 'react-native-pie-chart';

export default class Detail extends Component{

 

  render() {
    
    const chart_wh = 250
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']

    return(
        <View style={styles.list}>

                <PieChart
                    chart_wh={chart_wh}
                    series={series}
                    sliceColor={sliceColor}
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
  },
  input:{
    height:40,
    width:180
  }
});