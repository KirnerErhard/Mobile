/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict'

import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Navigator
} from 'react-native';


export default class Login extends Component{

  constructor(){
    super(props);
    this.han
  }


  render(){
    return(
      <View>
        <Text>Welcome to Music Festival!</Text>

        <TextInput
            style={{height: 40, width: 180,color:"#FF5722"}}
            placeholder="User name"
            onChangeText={(text) => this.setState({text})}/>
        <TextInput
                 style={{height: 40, width: 180,color:"#FF5722"}}
                 placeholder="Password"
                 secureTextEntry = {true}
                 onChangeText={(text) => this.setState({text})}/>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009688',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    height: 30,
    backgroundColor: 'blue',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});