import React, { Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  ImageBackground,
  TextInput,
  Dimensions
} from "react-native";
import bgImage from '../pictures/236.jpg'

const {width:WIDTH} = Dimensions.get('window')

class Registerscreen extends Component {
  render(){
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <SafeAreaView style={{ flex: 1 }}>
          <View style={{flex:1}}>
            <View style={styles.headerbox}>
              <Text style={styles.headline}>
              Registerscreen
              </Text>
            </View>
            <TextInput
            style={styles.input}
            placeholder = {'Email'}
            placeholderTextColor = {'rgba(255,255,0.7)'}
            underlineColorAndroid = 'transparent'
            />
          </View>
      </SafeAreaView>
      </ImageBackground>
    );
  }
}
export default Registerscreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  headline: {
    marginTop: 10,
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 25,
 },
 headerbox:{
   //backgroundColor: 'white',
   height: 70,
   borderBottomWidth: 1,
   borderBottomColor: '#dddddd'

 },
 backgroundContainer:{
   flex:1,
   width: null,
   height: null,
   justifyContent:'center',
   alignItems:'center'
 },
 input:{
   width: WIDTH -55,
   height: 40,
   borderRadius: 25,
   fontSize: 16,
   paddingLeft: 45,
   backgroundColor: 'white',
   color: 'rgba(255,255,0.7)',
   marginHorizontal: 25,

 }

});
