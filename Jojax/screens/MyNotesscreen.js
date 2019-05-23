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
  FlatList
} from "react-native";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");


class MyNotesscreen extends Component {
  static navigationOptions = {
    headerBackTitle: 'Go Back',
    title: 'My Notes',
    headerTitleStyle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 25
    },
  };
  createNoteHeader(string) {
    var pixelWidth = require("string-pixel-width");
    const stringWidth = pixelWidth(string, { size: 16 });
    console.log("detta är bredden på strängen: " + stringWidth);
    console.log("detta är den tillåtna maxbredden: " + (WIDTH - 67- 70));
    console.log(string)
    var string1 = string;
    console.log(string1)
    if (stringWidth > WIDTH - 70 - 67) {
      var substring = "";
      for (var i = 0; i < string.length; i++) {
        substring = substring + string[i];
        if ((pixelWidth(substring, { size: 16 }) >= WIDTH - 67 - 70)&& substring[i]=== " ") {
          var remainingString = string.substring(i+1);
          console.log(remainingString);
          return [substring.substring(0,substring.length -1) + "...", remainingString];

        }
      }
    }
      return [string,]


  }
  createNoteEnding(string) {
    //var reversedString = [...string].reverse().join('');
    console.log("note ending: " + string)
    var pixelWidth = require("string-pixel-width");
    const stringWidth = pixelWidth(string, { size: 14 });
    if (stringWidth > (WIDTH - 70 - 67) / 1.3) {
      var substring = "";
      for (let i = string.length - 1; i >= 0; i--) {
        substring = string[i] + substring;
        if ((pixelWidth(substring, { size: 14 }) >= (WIDTH - 67 - 70) / 1.3)&& string[i]=== " ") {
          return substring.substring(1,);
        }
      }
    }
    return string;
  }

  constructor(props) {
    super(props);
    this.state = {
      personalNotes: [
        { id: 1, text: "Hej jag heter Jonas och detta är ett test på en note"},
        { id: 2, text: "Hej jag heter Axel och detta är ett test på en note"},
        { id: 3, text: "Hej jag heter Jakob och detta är ett test på en note"},
        { id: 4, text: "Hej jag heter Jons och på en note som är bajs"}],

    };

  }

  getNoteHeader(item){
    data = this.createNoteHeader(item.text);
    var noteheader = data[0];
    console.log(noteheader)
    return (noteheader);
  }
  getNoteEnding(item){
    data = this.createNoteHeader(item.text);
    var noteEnding = this.createNoteEnding(data[1]);
    return(noteEnding);
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.noteContainer}>
        <View style={styles.noteIconContainer}>
          <MaterialCommunityIcons
            name={"checkbox-blank-circle"}
            size={45}
            color={"rgba(0, 230, 64, 1)"}
            raised={true}
          />
        </View>
      <TouchableOpacity style = {styles.notesTouch}>
      <View style={styles.noteTextContainer}>
        <Text style={styles.noteTextHeading}>
          {this.getNoteHeader(item)}
        </Text>
        <Text style={styles.noteTextEnding}>
          {this.getNoteEnding(item)} {item.id}
        </Text>
      </View>
    </TouchableOpacity>
  </View>

    );
  };
  returnNote(id, text) {
    this.setState(prevState => ({
      personalNotes: [...prevState.personalNotes, {id: id , text:text}]
    }))
    //this.setState({id: id, text: text});
  }
  lastObject(array){
    var index = array.length -1;
    return (array[index].text)

  }
  lastObjectID(array){
    var index = array.length -1;
    var id = array[index].id;
    console.log(id)
    return (id)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
            <View>
              <FlatList
                data={this.state.personalNotes}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
              />
            </View>
        </ScrollView>
        <Text>
          {this.lastObject(this.state.personalNotes)}
        </Text>
        <View style={styles.footer}>
          <View style={styles.iconContainer}>
            <AntDesign
              name="pluscircle"
              size={70}
              color={"rgba(0, 230, 64, 1)"}
              onPress={() => this.props.navigation.navigate('NewNote',{returnNote: this.returnNote.bind(this), prevID: this.lastObjectID(this.state.personalNotes)})
            }
            />
          </View>
        </View>
      </View>
    );
  }
}
export default MyNotesscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headline: {
    textAlign: "center", // <-- the magic
    fontWeight: "bold",
    fontSize: 25
  },
  headerBox: {
    height: 40,
    width: WIDTH,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1
  },
  footer: {
    alignItems: "flex-end"
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

  },
  noteIconContainer: {
    justifyContent: "center",
    marginHorizontal:10,
  },
  noteTextContainer: {
    marginVertical: 10,
    justifyContent: 'center',
  },
  noteTextHeading: {
    fontWeight: "bold",
    color: "rgba(46, 49, 49, 1)",
    fontSize: 16
  },
  noteTextEnding: {
    color: "rgba(46, 49, 49, 1)",
    fontSize: 14
  },
  notesTouch:{
    width: '100%',
    height: '100%'
  },
});
