import React, { Component} from "react";
import {usersDB} from '../App';
import {Alert} from 'react-native'
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
import bgImage from '../pictures/236.jpg'

const { width:WIDTH, height:HEIGHT } = Dimensions.get('window');

class Registerscreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: 'Email',
      password: 'Password',
      repeatPassword: 'Repeat Password',
      users: props.users
    }
  }

  readValues(){
    console.log(this.state.users)
    if(this.state.password === this.state.repeatPassword){
      if(this.checkIfUserExist() === false){
        this.createNewUser();
      }
    }
    else{
      Alert.alert("Passwords do not coincide")
    }
  }

  createNewUser(){
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    usersDB.push(data);
  }



  render(){
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
  }



}
export default Registerscreen;

const styles = StyleSheet.create({
  backgroundContainer:{
    flex:1,
    width: null,
    height: null,
    justifyContent:'center',
    alignItems:'center'
  },
  textContainer:{
    marginBottom:40,
    width: WIDTH/2,
    justifyContent: 'flex-start'
  },
  textRegister:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.7)'
  },
  input:{
    width: WIDTH -55,
    height: 40,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'white',
    color: 'rgba(0,0,0,0.9)',
    marginHorizontal: 25,
  },
  input2:{
    marginTop:10,
  },
  registerButton:{
    width: WIDTH -55,
    height: 40,
    borderRadius: 25,
    marginTop: 35,
    justifyContent: 'center',
    backgroundColor: '#07757D',
  },
  textRegisterButton:{
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    textAlign: 'center'
  },
  termsContainer:{
    justifyContent:'center',
    width: WIDTH/1.65,
    marginTop:10
  },
  textTerms:{
    textAlign: 'center',
    fontSize: 12,
  },



});
