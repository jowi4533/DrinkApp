import React, { Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Button
} from "react-native";
import bgImage from '../pictures/236.jpg'

class MyPagescreen extends Component {
  render(){
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <SafeAreaView style={{ flex: 1 }}>
          <View style={{flex:1}}>
            <View style={styles.headerbox}>
              <Text style={styles.headline}>
              MyPage
              </Text>
            </View>
            <Button title="Login / Register"
            onPress={() => this.props.navigation.navigate('Login')}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
            <Button title="My Bar"
            onPress={() => this.props.navigation.navigate('MyBar')}
            />
            <Button title="My Favorites"
            onPress={() => this.props.navigation.navigate('MyFavoriteDrinks')}
            />
          <Button title="My Notes"
            onPress={() => this.props.navigation.navigate('MyNotes')}
            />
            </View>
          </View>

      </SafeAreaView>
      </ImageBackground>
    );
  }
}
export default MyPagescreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex:1,
    width: null,
    height: null,
    justifyContent:'center',
    alignItems:'center'
  },
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
   height: 60,
   borderBottomWidth: 1,
   borderBottomColor: '#dddddd'

 },
 buttonContainer:{
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'space-around'
 },
buttons:{
   width: '45%',
   height: '45%',
   backgroundColor: 'green',
   borderRadius: 1,
   borderColor: 'black',

 }
});
