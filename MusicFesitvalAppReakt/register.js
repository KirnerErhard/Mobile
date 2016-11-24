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
  TouchableHighlight,
  Navigator
} from 'react-native';

export default class Register extends Component{
    navigate(routeName){
        this.props.navigator.push({
            name: routeName
        })
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Music Festival!
        </Text>

        <TextInput
                 style={{height: 40, width: 180,color:"#FF5722"}}
                 placeholder="Email"
                 onChangeText={(text) => this.setState({text})}/>
        <TextInput
            style={{height: 40, width: 180,color:"#FF5722"}}
            placeholder="User name"
            onChangeText={(text) => this.setState({text})}/>
        <TextInput
                 style={{height: 40, width: 180,color:"#FF5722"}}
                 placeholder="Password"
                 secureTextEntry = {true}
                 onChangeText={(text) => this.setState({text})}/>
        <TextInput
                style={{height: 40, width: 180, color:"#FF5722"}}
                placeholder="Renter password"
                secureTextEntry = {true}
                onChangeText={(text) => this.setState({text})}/>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableHighlight onPress={this.navigate.bind(this, 'home')} style = {styles.button}>
                  <Text>Submit</Text>
          </TouchableHighlight>
        </View>

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