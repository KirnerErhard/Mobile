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

import * as firebase from 'firebase';

import FCM from 'react-native-fcm';

export default class Home extends Component{

  constructor(props){
    super(props);

    this.itemsRef = firebase.database().ref('Artist');

    this.state = {
      dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      name:'',
      time:'',
      details:''
    }
  }

  componentDidMount(){
    this.listenForItems(this.itemsRef);
  
  }

  listenForItems(itemsRef){
    itemsRef.on('value', (snap) =>{
      var items = [];
      snap.forEach((child)=>{
        items.push({
            name:child.val().name,
            time:child.val().time,
            details:child.val().time,
            _key: child.key
        });
      });

      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  handleClick(){
   this.itemsRef.push({ name:this.state.name, time:this.state.time, details: this.state.details});
  }

  navigate(routeName){
        this.props.navigator.push({
            name: routeName
        })
  }

  render() {

    return(
        <View style={styles.list}>


          <Text>Name:</Text>
         <TextInput onChangeText={(text) => this.setState({name:text})} style={styles.input}/>
         <Text>Time:</Text>
         <TextInput onChangeText={(text) => this.setState({time:text})}  style={styles.input}/>
         <Text>Details:</Text>
         <TextInput onChangeText={(text) => this.setState({details:text})} style={styles.input}/>
       
        <ListView
          dataSource={this.state.dataSource}
          renderRow = { (rowData)=>
            <View>
              <Text style={styles.text}
                onPress={ () => Alert.alert(
                  'Delete Artist ' + rowData.name,
                    null,
                  [
                    {text:'Details', onPress: () => this.navigate('detail') },
                    {text:'Cancel'},
                    {text:'Ok', onPress:()=> this.itemsRef.child(rowData._key).remove()}
                  ]
                )} >
                {rowData.name}

              </Text>
            </View>
           } 
        />

         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableHighlight onPress = {this.handleClick.bind(this)}>
                    <Text>Add</Text>
            </TouchableHighlight>
          </View>

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