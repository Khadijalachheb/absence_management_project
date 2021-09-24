// Components/FilmDetail.js

import React, { useState } from 'react'
import { StyleSheet,View, Text, Switch,FlatList,TouchableOpacity} from 'react-native'
import * as SQLite from 'expo-sqlite';
import Abs from './Abs';

var togglevalue=false;
var absencedata=[];
class ClassDetail extends React.Component{


  constructor(props) {
    super(props);
this.state = { namesStudent: []};
     const id=0;
this.state = { idStudent: id};
}

showStudent(){
    var length;
    const idClass=this.props.navigation.state.params.idClass;
    const db=SQLite.openDatabase('mydb.db');
    console.log("create data base");
    db.transaction(
     tx =>{
       console.log("1-create table Student");
       tx.executeSql('create table if not exists Student(id integer primary key not null, name text ,idClass integer );');
       tx.executeSql("select  * from Student",[],(tx,results) =>
       {

       this.setState({namesStudent:results.rows._array});
         this.state.namesStudent.map((item, key) => {
           var absDtata=[{id:item.id,checked:false}];
           absencedata.push(absDtata);
         });

       });
     });



}
goToStudent = (idStudent,nameStudent) => {
 console.log("Display Student with id " + idStudent +" "+nameStudent);
 this.props.navigation.navigate("StudentDetail", { idStudent: idStudent ,nameStudent: nameStudent});
}

handleToggle = (index) => {
  setIsEnabled(previousState => !previousState);

   let tempArr= absencedata;
   tempArr[index].checked = !tempArr[index].checked
   absencedata=tempArr;
}
onSubmit = () => {
   let arrOfCheckedSwitches= []
   absencedata.forEach (item => item.checked && arrOfCheckedSwitches.push(item.name))
   console.log("array of names :", arrOfCheckedSwitches)
}

render(){
     return (
            <View style={styles.main_container}>
            <FlatList data={this.state.namesStudent} renderItem={({item}) =>
             <View style={styles.student}>

             <TouchableOpacity style={styles.touch}  onPress={ () =>
             this.goToStudent(item.id,item.name)}>
             <Text>{item.name}</Text>
             </TouchableOpacity>
             <Abs/>
            </View>

             }
             />
             <TouchableOpacity style={styles.nouveau} onPress={ () =>
              this.onSubmit()}>
              <Text  >Submit</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.nouveau} onPress={ () =>
             this.showStudent()}>
             <Text  >show student</Text>
             </TouchableOpacity>
             </View>
    )
  }

}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop:20,

  },
  main_container2: {

      backgroundColor:'gray',
      height:100,

  },
  switch: {
    flex:6,
  },
  touch:{
    flex:4,
  },
  nouveau: {
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    backgroundColor: 'pink',
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft:45,
    paddingRight:5,
    paddingTop:5,
    color:'white',
    fontSize: 20,
    justifyContent: 'center',
  },
  student: {
   flexDirection:"row",
    marginTop:5,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    backgroundColor: '#81b0aa',
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft:45,
    paddingRight:5,
    paddingTop:5,
    paddingBottom:15,
    color:'white',
    fontSize: 20,
    justifyContent: 'center',
  },
})

export default ClassDetail
