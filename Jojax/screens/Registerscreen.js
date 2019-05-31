import React, { Component} from "react";
import {Alert} from 'react-native'
import App from '../App'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import bgImage from "../pictures/236.jpg";
import {colors} from "../assets/colors.js";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");


class Registerscreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: 'Email',
      password: 'Password',
      repeatPassword: 'Repeat Password',

      usersDB: props.screenProps.usersDB,
      userAuth : props.screenProps.userAuth,
      loggedIn: false,

    }
  }

  static navigationOptions = {
    title: 'Register',
    headerTitleStyle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 25
    },
  };

  readValues(){
    if(this.state.password === this.state.repeatPassword){
      if(this.checkIfUserExist() === false){
        this.createNewUser();
      }
    }
    else{
      Alert.alert("Passwords do not coincide")
    }
  }

  initiateListener(){
    this.state.userAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.displayName)
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;

      } else {
        console.log("user is logged out")
      }
    });
  }

  createNewUser(){
    let data = {
      email: this.state.email,
      password: this.state.password,
    }

    const promise = this.state.userAuth.createUserWithEmailAndPassword(data.email, data.password)
    promise.catch(e => console.log(e.message))

    data.email = this.state.email.toLowerCase()
    this.state.usersDB.push(data)

    this.props.navigation.navigate("AllDrinks")
    this.setState({loggedIn: true})
  }

  checkIfUserExist(){
    return false;
  }

  logOutUser(){
    this.state.userAuth.signOut()
    this.setState({loggedIn: false})
  }

  render(){
    if(this.state.loggedIn=== false){
      return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style= {styles.textContainer}>
        <Text style = {styles.textRegister}>
        REGISTER NEW ACCOUNT
        </Text>
        </View>
        <View>
        <TextInput
        style={styles.input}
        placeholder = {'Email'}
        placeholderTextColor = {'rgba(0,0,0,0.5)'}
        underlineColorAndroid = 'transparent'
        onChangeText = {email => this.setState({email})}
        />
        </View>
        <View style= {styles.input2}>
        <TextInput
        style={styles.input}
        placeholder = {"Password"}
        secureTextEntry= {true}
        placeholderTextColor = {'rgba(0,0,0,0.5)'}
        underlineColorAndroid = 'transparent'
        onChangeText = {password => this.setState({password})}
        />
        </View>
        <View style= {styles.input2}>
        <TextInput
        style={styles.input}
        placeholder = {"Repeat Password"}
        secureTextEntry= {true}
        placeholderTextColor = {'rgba(0,0,0,0.5)'}
        underlineColorAndroid = 'transparent'
        onChangeText = {repeatPassword => this.setState({repeatPassword})}
        />
        </View>
        <View style ={styles.termsContainer}>
        <Text style ={styles.textTerms}>
        By tapping "Register New Account" you agree to the terms & conditions
        </Text>
        </View>

        <TouchableOpacity
        onPress={this.readValues.bind(this)}
        style={styles.registerButton}>
        <Text style = {styles.textRegisterButton}>REGISTER NEW ACCOUNT</Text>
        </TouchableOpacity>
        </ImageBackground>
      );
    } else{
      return(
        <View>
        <Text> Ur logged in! </Text>

        <TouchableOpacity
        style={styles.loginButton}
        onPress= {this.logOutUser.bind(this)}>
        <Text style = {styles.textLoginButton}>SIGN OUT</Text>
        </TouchableOpacity>
        </View>
      );
    }
  }



}
export default Registerscreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    marginBottom: 40,
    width: WIDTH / 2,
    justifyContent: "flex-start"
  },
  textRegister: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "rgba(0,0,0,0.7)"
  },
  input: {
    width: WIDTH - 55,
    height: 40,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "white",
    color: "rgba(0,0,0,0.9)",
    marginHorizontal: 25
  },
  input2: {
    marginTop: 10
  },
  registerButton: {
    width: WIDTH - 55,
    height: 40,
    borderRadius: 25,
    marginTop: 35,
    justifyContent: "center",
    backgroundColor: "#07757D"
  },
  textRegisterButton: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    textAlign: "center"
  },
  termsContainer: {
    justifyContent: "center",
    width: WIDTH / 1.65,
    marginTop: 10
  },
  textTerms: {
    textAlign: "center",
    fontSize: 12
  }
});
