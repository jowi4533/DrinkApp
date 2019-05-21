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

class NewNotescreen extends Component {



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerBox}>
          <Text style={styles.headline}>Notes</Text>
        </View>

        </View>
    );
  }
}
export default NewNotescreen;

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
