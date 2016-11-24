import React from 'react';
import{
    View, 
    ListView,
    StyleSheet,
    Navigator,
    TouchableOpacity,
    Text
} from 'react-native'

import * as Progress from 'react-native-progress'
import InfiniteScrollView from 'react-native-infinite-scroll-view';

var DomParser = require('xmldom').DomParser;

const style = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20
    },
    separator:{
        flex:1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E'
    },
    progress:{
        marginTop:40
    },
});

class ListScreen extends React.Component{
    constructor(props){
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged:(r1, r2)=>r1!=r2
        });

        this.state={
            dataSource:ds.cloneWithRows(['row1', 'row2']),
            artistsList: [],
            loaded: false,
        };
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        setTimeout(() => {
            fetch("artists.xml")
            .then((response)=>response.text())
            .then((responseText)=> {
                this.state.artistsList = new Array();
                var parser = new DomParser();
                var doc = parser.parseFromString(responseText,"text/xml").documentElement;
                var artists = doc.getElementByTagName("Artist");
                for (var index = 0; index < artists.length; index++) {
                    var element = artists.item( [index]);
                    var rated = artists.getAttribute("Rated");
                    var dates = element.getElementByTagName("Date");
                    for (var i = 0; i < dates.length; i++) {
                        var el = dates.item([i]);
                        var dateValue = el.firstChild.data;
                        var artist = this.state.artistsList.filter((a)=>a.symbol === artist)[0];
                        if(artist==null){
                            artist = {
                                symbol:artist,
                                values: [{val:dateValue}],
                            },
                            this.state.artists.push(artist);
                        }else{
                            artist.values.push({val:dateValue});
                        }
                    }
                    
                }
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(this.state.artists),
                    loaded:true,
                });
            })
            .catch((err)=>console.error(err))
            .done();
        }, 1000)
    }
    render(){
        if(!this.state.loaded){
            return (
                <View style={styles.progress}>
                <Text>Please wait ... </Text>
                <Progress.Bar progress={0.3} width={200} indeterminate={true} />
                </View>
                );
        }
        return(
            <ListView style={styles.container}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(data) => 
            <TouchableOpacity onPress={()=> this.props.navigator.push({index: 1,
               passProps:{
                   symbol: data.symbol, 
                   val: data.values[0].val,
                }})}>
               <View>
                 <Text style={styles.symbol}>{data.symbol}</Text>
               </View>
            </TouchableOpacity>
	             }
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
            <View key={rowID} style={{height:1, backgroundColor: 'lightgray'}}/>
          }
       	/>
        );
    }

}
export default ListScreen;