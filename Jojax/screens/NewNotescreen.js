import React, { Component } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Button
} from "react-native";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

class NewNotescreen extends Component {
  constructor(props){
    super(props);
    this.state ={
      text: "" ,
      myID: this.props.navigation.state.params.prevID +1



    }
    //const { navigation } = this.props,
    //const myID = navigation.getParam('prevID', 0) +1,

  }
  static navigationOptions = ({ navigation }) => {
    return {
    title: 'New Note',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 25
    },

  };
};
  goBack() {

      if (/\S/.test(this.state.text)){
        this.props.navigation.state.params.returnNote(this.state.myID, this.state.text);
        this.props.navigation.goBack();
      }
      else{
        this.props.navigation.goBack();
      }
   };
   componentWillMount() {
     this.props.navigation.setParams({ createNote: this.createNote });
   }


  render() {

    return (
      <View style={styles.container}>
        <View style = {styles.textInputContainer}>
        <TextInput
          style = {styles.textInputSize}
          maxLength = {250}
          placeholder = "Type your text here"
          value = {this.state.text}
          onChangeText = { (typedText) => {
            this.setState({text: typedText});
          }
          }>

        </TextInput>
        </View>
        <Text style = {{margin: 25, fontSize : 30, fontWeight: 'bold'}}>
          {this.state.text}
        </Text>
        <Button
         title="Save Note"
         onPress={() => this.goBack()}
       />
        <View style = {styles.wordCountTextBox}>
        <Text style = {styles.wordCountText}>
          Characters:  {this.state.text.length}/250

        </Text>
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
  textInputContainer:{
    padding: 10
  },
  textInputSize:{
    fontSize: 20
  },
  wordCountText:{
    color: 'rgba(108, 122, 137, 1)'
  },
  wordCountTextBox:{
    padding: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0

  }

});
