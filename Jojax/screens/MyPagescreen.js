import React, { Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import bgImage from '../pictures/236.jpg'
import myBarImage from '../pictures/myBarPic.jpg'
import myFavoritesImage from '../pictures/myFavoritesPic.png'

const { width:WIDTH, height:HEIGHT } = Dimensions.get('window');

class MyPagescreen extends Component {
  render(){
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerbox}>
              <Text style={styles.headline}>
              MyPage
              </Text>
            </View>
            <Button title="Go to log in"
            onPress={() => this.props.navigation.navigate('Login')}
            />
          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.myBarButton} onPress={() => this.props.navigation.navigate('MyBar')}>
            <ImageBackground source={myBarImage} style={styles.myBarImage} imageStyle= {{borderRadius: 25}} blurRadius={2}>
            <Text style = {styles.textMyBarButton}>My Bar</Text>
            </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.myFavoritesButton} onPress={() => this.props.navigation.navigate('MyFavoriteDrinks')}>
            <ImageBackground source={myFavoritesImage} style={styles.myFavoritesImage} imageStyle= {{borderRadius: 25}} blurRadius={2}>
            <Text style = {styles.textMyFavoritesButton}>My Favorites</Text>
            </ImageBackground>

            </TouchableOpacity>

            <TouchableOpacity style={styles.myNotesButton} onPress={() => this.props.navigation.navigate('MyNotes')}>
            <Text style = {styles.textMyNotesButton}>My Notes</Text>
            </TouchableOpacity>

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
   flexWrap: 'wrap',
   flexDirection: 'row',
   justifyContent: 'space-around',
   marginBottom: 10,
 },

myBarImage: {
  blurRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  // opacity: 0.6,
},

myBarButton: {
  width: '45%',
  height: '50%',
  borderRadius: 25,
  backgroundColor: '#07757D',
  justifyContent: 'center',
  marginTop: 25,
},

textMyBarButton: {
  color: 'black',
  fontSize: 32,
  fontWeight: 'bolder',
  textAlign: 'center',

},

myFavoritesImage: {
  blurRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  // opacity: 0.6,
},

myFavoritesButton: {
  width: '45%',
  height: '50%',
  borderRadius: 25,
  backgroundColor: '#07757D',
  justifyContent: 'center',
  marginTop: 25,
},

textMyFavoritesButton: {
  color: 'black',
  fontSize: 32,
  fontWeight: 'bolder',
  textAlign: 'center',
},

myNotesButton: {
  width: '45%',
  height: '50%',
  borderRadius: 25,
  backgroundColor: '#07757D',
  justifyContent: 'center',
  marginTop: 25,
},

textMyNotesButton: {
  color: 'rgba(255,255,255,0.9)',
  fontSize: 16,
  textAlign: 'center'
},

});
