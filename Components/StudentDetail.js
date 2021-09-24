// Components/FilmDetail.js

import React, { useState } from 'react'
import { StyleSheet, View, Text, Switch,FlatList,TouchableOpacity} from 'react-native'
import * as SQLite from 'expo-sqlite';
import Abs from './Abs';

 const data=[{date:"2020/05/18",observation:"malade"},
{date:"2020/05/18",observation:"malade"}];

class ClassDetail extends React.Component {
  constructor(props) {
    super(props);
}
render() {
     console.log(this.props.navigation);
     return (
            <View style={styles.main_container}>
      <Text style={styles.name}>{this.props.navigation.state.params.nameStudent}</Text>
      <View style={styles.head}>
      <Text style={styles.contentHead}>date</Text>
      <Text style={styles.contentHead}>observation</Text>
      <Text style={styles.contentHead}>delete</Text>
      </View>
      <FlatList data={[{date:"2020/05/18",observation:""},{date:"2020/05/18",observation:"malade"}]} renderItem={({item}) =>
       <View style={styles.absence}>

       <Text style={styles.content}>{item.date}</Text>
       <Text style={styles.content} >{item.observation}</Text>
       <View style={styles.content}><Text style={styles.delete}>delete</Text></View>
      </View>
       }
       />
             </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop:20,
    flexDirection: 'column'
  },
  delete:{
    color:"skyblue",
    
  },
  name:{
    fontSize:20,
    marginTop:10,
    marginLeft: 50,

    marginBottom:10,
  },
  head: {

    flexDirection: 'row',
  },
  absence: {

      flexDirection: 'row',
  },
  contentHead:{
    flex:1,
    marginTop:10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    backgroundColor: 'gray',
    borderWidth: 1,
    borderColor: 'pink',
    paddingLeft:10,
    paddingRight:5,
    paddingTop:5,
    color: 'pink',
    fontSize: 15,
    alignItems: 'center',
  },
  content: {
    flex:1,
    marginTop:10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    backgroundColor: 'pink',
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft:10,
    paddingRight:5,
    paddingTop:5,
    color: 'white',
    fontSize: 15,
    alignItems: 'center',

  },

})

export default ClassDetail
