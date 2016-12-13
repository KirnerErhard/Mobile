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

export default class Home extends Component{

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
    var artists = realm.objects('Artist');

    this.state ={
      dataSource:ds.cloneWithRows(artists)//['Kings of Leon', 'Queen', 'Scorpions', 'Dub FX', 'The xx'])
    };
  }

  handleClick(){
    realm.write(()=>{
      realm.create('Artist', {
        name:this.state.name1, 
        time:this.state.time,
        details:this.state.details
      })
    });
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
         <TextInput onChangeText={(name1) => this.setState({name1})} style={styles.input}/>
         <Text>Time:</Text>
         <TextInput onChangeText={(time) => this.setState({time})}  style={styles.input}/>
         <Text>Details:</Text>
         <TextInput onChangeText={(details) => this.setState({details})} style={styles.input}/>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>{realm.objects('Artist').length}</Text>
            <TouchableHighlight onPress = {this.handleClick.bind(this)}>
                    <Text>Add</Text>
            </TouchableHighlight>
          </View>
          

        <ListView
          dataSource = {this.state.dataSource}
          renderRow = { (rowData)=>
            <View>
              <Text style={styles.text}
                onPress={ () => Alert.alert(
                  'Delete Artist ' + rowData.name,
                    null,
                  [
                    {text:'Details', onPress: () => this.navigate('detail') },
                    {text:'Cancel'},
                    {text:'Ok', onPress: () => realm.write(()=> {
                      realm.delete(realm.objects('Artist').find((artist) => rowData.name == artist.name))}
                      )},
                  ]
                )} >
                {rowData.name}

              </Text>
            </View>
           } 
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