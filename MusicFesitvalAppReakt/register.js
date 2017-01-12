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

import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCXRzUiXY1Iu_OBt1vPlNR00V7vMUhjXBU",
    authDomain: "musicfestivalapp-6357d.firebaseapp.com",
    databaseURL: "https://musicfestivalapp-6357d.firebaseio.com",
    storageBucket: "musicfestivalapp-6357d.appspot.com",
    messagingSenderId: "1063257010458"
  };
  firebase.initializeApp(config);

export default class Register extends Component{
    constructor(props){
      super(props);
      this.state = {
        loaded:true,
        email:'',
        password:''                                                                                          
      };
    }

    navigate(routeName){
        this.props.navigator.push({
            name: routeName
        })
    }

    handleRegisterClick(){
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
      this.navigate('home');
    }

     handleSignInClick(){
	  	firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
      this.navigate('home');
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
                 onChangeText={(text) => this.setState({email:text})}/>
                 
        <TextInput
                 style={{height: 40, width: 180,color:"#FF5722"}}
                 placeholder="Password"
                 secureTextEntry = {true}
                 onChangeText={(text) => this.setState({password:text})}/>
       
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableHighlight onPress={this.handleSignInClick.bind(this)} style = {styles.button}>
                  <Text>Sign in</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={this.handleRegisterClick.bind(this)} style = {styles.button}>
                  <Text>Register</Text>
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