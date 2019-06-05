import React, { Component } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
//npm install --save string-pixel-width
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Button
} from "react-native";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

import NewNoteButton from "../components/NewNoteButton.js";
import NoteStatusButton from "../components/NoteStatusButton.js";
import {colors} from "../assets/colors.js";

class MyNotesscreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userAuth : props.screenProps.userAuth,
      usersDB: props.screenProps.usersDB,
      loggedIn : true,

      personalNotes : [],
    }

    this.props.navigation.setParams({
      handleNewNotepress: this.handleNewNotepress
    });

    this.loadResources()
  }

  // personalNotes: [
  //   { id: 1, text: "Buy Sparkling Wine for the Aperol Spritz",noteStatus:"orange" }
  // ],
  loadResources(){
    this.setUpDatabaseListeners()
    this.setUpNavigationListener()
    this.initiateListener()
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Notes",
      headerTitleStyle: {
        width: "100%",
        fontFamily: "Quicksand-Medium",
        fontSize: 25,
        color: colors.black
      },

      headerRight: (
        <NewNoteButton onPress={navigation.getParam("handleNewNotepress")} />
      ),
      headerBackTitleStyle: {
        fontSize: 18
      }
    };
  };

  setUpDatabaseListeners(){
      this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
        (loggedInUser) =>{

        let myNotes = []
        let currentUser = loggedInUser.val()
        let myNotesRef = this.state.usersDB.child(loggedInUser.key).child("myNotes")

        myNotesRef.on("child_added", (newNote) =>{
          let note = newNote.val()
          myNotes.push(note)
          this.state.personalNotes = myNotes
          this.setState(this.state)
        })

        myNotesRef.on("child_removed", (newNote) => {
          let note = newNote.val()
          for(let i = 0; i < myNotes.length; i++){
            if(myNotes[i].id === note.id){
              myNotes.splice(i, 1)
            }
          }
          this.state.personalNotes = myNotes

        })

        myNotesRef.on("child_changed", (changedValue) => {
          newValue = changedValue.val()

          for(let i = 0; i < this.state.personalNotes.length; i++){
            if(this.state.personalNotes[i].id === newValue.id){
              this.state.personalNotes[i] = newValue
            }
          }
        })
      })

  }

  setUpNavigationListener() {
    this.props.navigation.addListener('didFocus', () => {
      // get your new data here and then set state it will rerender
      console.log("In navigationlistener (MyNotesScreen)")
      this.setState(this.state)
    });
  }

  initiateListener(){
    this.state.userAuth.onAuthStateChanged(function(user) {
      if (user) {
        console.log("In listener, user online (MyNotesScreen)")

      } else {
        console.log("In listener, user offline (MyNotesScreen)")
      }
    });
  }

  createNoteHeader(string) {
    var pixelWidth = require("string-pixel-width");
    const stringWidth = pixelWidth(string, { size: 16 });
    var string1 = string;
    if (stringWidth > WIDTH - 70 - 67) {
      var substring = "";
      for (var i = 0; i < string.length; i++) {
        substring = substring + string[i];
        if (
          pixelWidth(substring, { size: 16 }) >= WIDTH - 67 - 70 &&
          substring[i] === " "
        ) {
          var remainingString = string.substring(i + 1);
          return [
            substring.substring(0, substring.length - 1) + "...",
            remainingString
          ];
        }
      }
    }
    return [string];
  }
  createNoteEnding(string) {
    //var reversedString = [...string].reverse().join('');
    var pixelWidth = require("string-pixel-width");
    const stringWidth = pixelWidth(string, { size: 14 });
    if (stringWidth > (WIDTH - 70 - 67) / 1.3) {
      var substring = "";
      for (let i = string.length - 1; i >= 0; i--) {
        substring = string[i] + substring;
        if (
          pixelWidth(substring, { size: 14 }) >= (WIDTH - 67 - 70) / 1.3 &&
          string[i] === " "
        ) {
          return substring.substring(1);
        }
      }
    }
    return string;
  }

  getNoteHeader(item) {
    data = this.createNoteHeader(item.text);
    var noteheader = data[0];
    return noteheader;
  }
  getNoteEnding(item) {
    data = this.createNoteHeader(item.text);
    var noteEnding = this.createNoteEnding(data[1]);
    return noteEnding;
  }
  lastObject(array) {
    var index = array.length - 1;
    return array[index].text;
  }
  lastObjectID(array) {

    var index = array.length - 1;

    if(index < 0){
      return id = 0
    }else{
      var id = array[index].id;
      return id;
    }

  }
  handleNewNotepress = () => {
    this.props.navigation.navigate("NewNote", {
      returnNote: this.returnNote.bind(this),
      prevID: this.lastObjectID(this.state.personalNotes)
    });
  };
  returnNote(id, text, noteStatus) {
    //Hit man kommer när man skapar en ny note va :)?
    let newNote = {
      id : id,
      text: text,
      noteStatus: noteStatus,
    }

    this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
      (loggedInUser) =>{

      let currentUser = loggedInUser.val()
      let myNotesRef = this.state.usersDB.child(loggedInUser.key).child("myNotes")
      var allMyNotes = (() => {
        let allNotes = {}
        for(i = 0; i < this.state.personalNotes.length; i++){
          allNotes["Note " + this.state.personalNotes[i].id] = this.state.personalNotes[i]
        }
        return allNotes;
      })();

      allMyNotes["Note " + newNote.id] = newNote
      myNotesRef.set(allMyNotes)
      })

    // this.setState(prevState => ({
    //   personalNotes: [...prevState.personalNotes, { id: id, text: text, noteStatus:noteStatus }]
    // }));
  }

  removeNote(id) {

    this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
      (loggedInUser) =>{

      let currentUser = loggedInUser.val()
      let myNotesRef = this.state.usersDB.child(loggedInUser.key).child("myNotes").child("Note " + id)

      myNotesRef.remove()
      })
  }

  updateNote = (id, text) => {
    console.log("hej")
    let personalNotesarr = this.state.personalNotes;
    let userNote = personalNotesarr.find(function(note) {
      return note.id === id
    })


    this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
      (loggedInUser) =>{

        let currentUser = loggedInUser.val()
        let myNotesRefText = this.state.usersDB.child(loggedInUser.key).child("myNotes").child("Note " + id).child("text")
        myNotesRefText.set(text)
        this.setState(this.state)
      })
}


  changeNoteStatus(id){

    this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
      (loggedInUser) =>{

      let currentUser = loggedInUser.val()
      let myNotesRefStatus = this.state.usersDB.child(loggedInUser.key).child("myNotes").child("Note " + id).child("noteStatus")

      let value = ""
      myNotesRefStatus.once("value", function(snap) {
          value = snap.val()
        })

        if (value === "green" ){
          myNotesRefStatus.set("orange")
          this.setState(this.state)
        }
        else if (value === "orange") {
          myNotesRefStatus.set("red")
          this.setState(this.state)
        }
        else{
          myNotesRefStatus.set("green")
          this.setState(this.state)
        }
      })

    // const noteStatus = personalNotesarr.find(note=> note.id ===id).noteStatus;
    // if (noteStatus === "green" ){
    //   personalNotesarr.find(note => note.id === id).noteStatus = "orange";
    //   this.setState({ personalNotes: personalNotesarr });
    //   return
    // }
    // else if (noteStatus === "orange") {
    //   personalNotesarr.find(note => note.id === id).noteStatus = "red";
    //   this.setState({ personalNotes: personalNotesarr });
    //   return
    // }
    // else{
    //   personalNotesarr.find(note => note.id === id).noteStatus = "green";
    //   this.setState({ personalNotes: personalNotesarr });
    //   return
    // }
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.noteContainer}>
      <NoteStatusButton
        noteStatus={item.noteStatus}
        onPress= {()=>this.changeNoteStatus(item.id)}
        >
      </NoteStatusButton>
      <View style = {styles.clickableNoteContainer}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("EditNote", {
              updateNote: this.updateNote.bind(this),
              removeNote: this.removeNote.bind(this),
              text: item.text,
              id: item.id
            })
          }
          style={styles.notesTouch}
        >
          <View style={styles.noteTextContainer}>
            <Text style={styles.noteTextHeading}>
              {this.getNoteHeader(item)}
            </Text>
            <Text style={styles.noteTextEnding}>
              {this.getNoteEnding(item)}
            </Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View>
            <FlatList
              inverted
              data={this.state.personalNotes}
              extraData= {this.state}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default MyNotesscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#dddddd"
  },
  iconContainer: {
    elevation: 10,
    zIndex: 10,
    marginRight: 10,
    marginBottom: 10
  },
  noteContainer: {
    flexDirection: "row",
    height: HEIGHT / 10,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 2,
    alignItems: "center",
  },
  noteTextContainer: {
    justifyContent: "center",
    height:'100%'
  },
  noteTextHeading: {
    color: colors.black,
    fontSize: 16,
    fontFamily: 'Quicksand-Bold'
  },
  noteTextEnding: {
    color: colors.black,
    fontSize: 14,
    fontFamily: 'Quicksand-Regular'
  },
  notesTouch: {
    width: "100%",
    height: "100%"
  },
  clickableNoteContainer:{
    width: '100%',
    justifyContent: 'center'
  }
});
