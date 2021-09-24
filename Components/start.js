
// Components/Search.js

import React from 'react'
import {TouchableOpacity,String, Alert ,StyleSheet, View, TextInput, Button, Text, FlatList ,Image} from 'react-native'
import * as SQLite from 'expo-sqlite';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';


var uri;
var nameFile;
var lastID;
var idStudent=0;
class Start extends React.Component {

constructor(props) {
  super(props);
  const startNames= [];
   this.state = { names: startNames};
   const id=0;
    this.state = { id: id};

}

showClass(){
  const db=SQLite.openDatabase('mydb.db');
  console.log("create data base");
  db.transaction(
   tx =>{
     console.log("1-create table user");
     tx.executeSql('create table if not exists Classe(id integer primary key not null, name text);');
     console.log("3-select User");
     tx.executeSql("select  * from Classe",[],(tx,results) =>
     {
       console.log(results);
       if(results.rows._array.length >0){
         this.setState({
           names:results.rows._array
         });
       }
     });
   });
}
openDocumentFileY(){

try {

(async () => {

  const res =   await  DocumentPicker.getDocumentAsync();
   uri=res.uri;
  var type=res.type;
   var name=res.name;
   var myArray = name.split('.');
   nameFile=myArray[0];
  var size=res.size;

   //data Database
   const db=SQLite.openDatabase('mydb.db');

   console.log("create data base");
   db.transaction(
     tx =>{
       console.log("1-create table user");
       tx.executeSql('create table if not exists Classe(id integer primary key not null, name text);');

       tx.executeSql("select  * from Classe",[],(tx,results) =>
       {
         if(results.rows._array.length > 0){

           this.setState({
             names:results.rows._array
           });

       this.state.names.map((item, key) => {
                 //key is the index of the array
                //item is the single item of the array
                lastID =(item.id + 1);

              });
            this.setState({id:lastID});

         }
       });
       });
       db.transaction(
         tx =>{
       console.log("2-insert row ");

       tx.executeSql('insert into Classe (id , name) values ('+this.state.id+',"'+nameFile+'");');
       const myId=(this.state.id + 1);
       this.setState({id:myId});

       console.log("3-select Class");
       tx.executeSql("select  * from Classe",[],(tx,results) =>
       {
         console.log(results);
         if(results.rows._array.length > 0){
           this.setState({
             names:results.rows._array
           });
         }
       }

     );
     });

    console.log('read txt');
   var content = await FileSystem.readAsStringAsync(uri);
    myArray = content.split(',');

      db.transaction(
        tx =>{
          console.log("1-create table Student");
          tx.executeSql('create table if not exists Student(id integer primary key not null, name text ,idClass integer );');
          myArray.map((item, key) => {
            console.log(" id :"+idStudent+" name :"+myArray[idStudent]+" id classe :"+this.state.id);
         tx.executeSql('insert into Student (id , name ,idClass) values ('+idStudent+',"'+  myArray[idStudent]+'",'+this.state.id+');');
            idStudent=(idStudent + 1);

     });
    });

})();

} catch (err) {
if (DocumentPicker.isCancel(err)) {
throw err;
}
}}


goToClasse = (idClass) => {
 console.log("Display class with id " + idClass);
 this.props.navigation.navigate("ClassDetail", { idClass: idClass});
}


  render() {
    return (
      <View style={styles.main_container}>

      <View style={styles.top} >
        <Text style={styles.welecome} >Bienvenu dans l'application de gestion d'absence.</Text>
        <TouchableOpacity   style={styles.nouveau} onPress={ () =>
        this.openDocumentFileY()}>
         <Text>Add a new class</Text>
         </TouchableOpacity>
        <TouchableOpacity   style={styles.nouveauTop} onPress={ () =>this.showClass()}>
         <Text>show classes</Text>
         </TouchableOpacity>
      </View>

     <View style={styles.center} >
        <FlatList data={this.state.names} renderItem={({item}) =>
         <TouchableOpacity  onPress={ () =>
         this.goToClasse(item.id)}>
        <Text style={styles.class} >{item.name}</Text>
        </TouchableOpacity>
         }/>
       </View>






      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor:'white',
  },
  top: {
    flex:6,
    backgroundColor: 'white',
  },
  welecome: {
   fontSize: 30,
   marginTop:20,
   justifyContent: 'center',
   color:"gray",
  },
  nouveauTop:{
    marginTop:20,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    backgroundColor: 'pink',
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft:45,
    paddingRight:5,
    paddingTop:5,
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
  },
  nouveau: {
    marginTop:10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    backgroundColor: 'pink',
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft:45,
    paddingRight:5,
    paddingTop:5,
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
  },

  center: {
    flex:10,
  },
  class: {
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    backgroundColor: 'gray',
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft:45,
    paddingRight:5,
    paddingTop:5,
    color:'white',
    fontSize: 20,
    justifyContent: 'center',
  },

})

export default Start
