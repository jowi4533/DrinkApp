import React, { Component } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

class MyNotesscreen extends Component {

  newNote(){
    
  }
  createNoteHeader(string) {
    var pixelWidth = require("string-pixel-width");
    const stringWidth = pixelWidth(string, { size: 16 });
    if (stringWidth > WIDTH - 70 - 67) {
      var substring = "";
      for (var i = 0; i < string.length; i++) {
        substring = substring + string[i];
        if (pixelWidth(substring, { size: 16 }) >= WIDTH - 67 - 70) {
          var remainingString = string.substring(i);
          return [substring + "...", remainingString];
        }
      }
    }
    return string;
  }
  createNoteEnding(string) {
    //var reversedString = [...string].reverse().join('');
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
      data1: {
        note:
          "hej detta är ett test på en titel på en titel som ska sträcka sig långt det kommer bli ännnu längre"
      },
      note_header: "",
      note_ending: ""
    };

    this.getNoteSubstrings = this.getNoteSubstrings.bind(this);
  }
  componentDidMount() {
    this.getNoteSubstrings(this.state.data1.note);
  }
  getNoteSubstrings(item) {
    data2 = this.createNoteHeader(item);
    var noteHeader = data2[0];
    var noteEnding = this.createNoteEnding(data2[1]);

    this.setState({ note_header: noteHeader });
    this.setState({ note_ending: noteEnding });
  }

  renderItem = ({ item, index }) => {
    return <View style={styles.noteContainer} />;
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerBox}>
          <Text style={styles.headline}>Notes</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
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
                {this.state.note_header}
              </Text>
              <Text style={styles.noteTextEnding}>
                {this.state.note_ending}
              </Text>
            </View>
          </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.iconContainer}>
            <AntDesign
              name="pluscircle"
              size={70}
              color={"rgba(0, 230, 64, 1)"}
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
