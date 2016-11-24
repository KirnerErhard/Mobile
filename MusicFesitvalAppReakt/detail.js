import React, {Component} from 'react';
import{
    TouchableHighlight,
    Image,
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native'

class DetailScreen extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return(
            <View style={stiles.container}>
                <Text></Text>
                <Text></Text>
                <Text></Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flex: 1,
        padding : 1,
        paddingTop:40,
    },
});

export default DetailScreen;
