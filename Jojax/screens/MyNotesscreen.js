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
      loggedIn : null,

      personalNotes: [
        { id: 1, text: "Hej jag heter Jonas och detta är ett test på en note",noteStatus:"green" },
        { id: 2, text: "Hej jag heter Axel och detta är ett test på en note", noteStatus:"orange" },
        { id: 3, text: "Hej jag heter Jakob och detta är ett test på en note", noteStatus:"green" },
        { id: 4, text: "Hej jag heter Jons och på en note som är bra", noteStatus:"green" },
        { id: 5, text: "Hej jag heter Axel och detta är ett test på en note", noteStatus:"green" },
        { id: 6, text: "Hej jag heter Jakob och detta är ett test på en note", noteStatus:"green" },
        { id: 7, text: "Hej jag heter Jons och på en note som är bra", noteStatus:"green" },
        { id: 8, text: "Hej jag heter Axel och detta är ett test på en note", noteStatus:"red" },
        { id: 9, text: "Hej jag heter Jakob och detta är ett test på en note", noteStatus:"orange" },
        { id: 10, text: "Hej jag heter Jons och på en note som är bra", noteStatus:"green" }
      ],
    }

    this.props.navigation.setParams({
      handleNewNotepress: this.handleNewNotepress
    });

    this.setUpNavigationListener()
    this.initiateListener()
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Notes",
      headerTitleStyle: {
        width: "100%",
        fontWeight: "bold",
        fontSize: 25,
        color: "black"
      },
      //headerTintColor: "black",
      headerRight: (
        <NewNoteButton onPress={navigation.getParam("handleNewNotepress")} />
      ),
      headerBackTitleStyle: {
        fontSize: 18
      }
    };
  };

  setUpNavigationListener() {
    this.props.navigation.addListener('didFocus', () => {
      this.checkUserLoggedIn()
      // get your new data here and then set state it will rerender
      console.log("In navigationlistener (MyNotesScreen)")
    });
  }

  checkUserLoggedIn(){
    if(this.state.userAuth.currentUser === null){
      //this.state.loggedIn = false
      this.setState({loggedIn: false})
    } else{
      //this.state.loggedIn = true
      this.setState({loggedIn: true})
    }
  }

  initiateListener(){
    this.state.userAuth.onAuthStateChanged(function(user) {
      if (user) {
        console.log("In listener, user online (MyNotesScreen)")
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
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
    var id = array[index].id;
    return id;
  }
  handleNewNotepress = () => {
    this.props.navigation.navigate("NewNote", {
      returnNote: this.returnNote.bind(this),
      prevID: this.lastObjectID(this.state.personalNotes)
    });
  };
  returnNote(id, text, noteStatus) {
    this.setState(prevState => ({
      personalNotes: [...prevState.personalNotes, { id: id, text: text, noteStatus:noteStatus }]
    }));
  }
  removeNote(id) {
    this.setState(state => {
      const personalNotes = state.personalNotes.filter(item => item.id !== id);
      return {
        personalNotes
      };
    });
  }
  updateNote = (id, text) => {
    let personalNotesarr = this.state.personalNotes;
    personalNotesarr.find(note => note.id === id).text = text;
    this.setState({ personalNotes: personalNotesarr });
  };
  changeNoteStatus(id){
    let personalNotesarr = this.state.personalNotes;
    const noteStatus = personalNotesarr.find(note=> note.id ===id).noteStatus;
    if (noteStatus === "green" ){
      personalNotesarr.find(note => note.id === id).noteStatus = "orange";
      this.setState({ personalNotes: personalNotesarr });
      return
    }
    else if (noteStatus === "orange") {
      personalNotesarr.find(note => note.id === id).noteStatus = "red";
      this.setState({ personalNotes: personalNotesarr });
      return
    }
    else{
      personalNotesarr.find(note => note.id === id).noteStatus = "green";
      this.setState({ personalNotes: personalNotesarr });
      return
    }
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
    color: "rgba(46, 49, 49, 1)",
    fontSize: 16,
    fontFamily: 'Quicksand-Bold'
  },
  noteTextEnding: {
    color: "rgba(46, 49, 49, 1)",
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
