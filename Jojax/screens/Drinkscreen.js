import React, { Component} from "react";
import { Ionicons,FontAwesome,Entypo,EvilIcons } from '@expo/vector-icons';
import {firebaseStorage} from '../App'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image

} from "react-native";
const { width:WIDTH, height:HEIGHT } = Dimensions.get('window');

class Drinkscreen extends Component {
  constructor(){
    super()
    this.state ={
      dataSource: [],
      vodkaIMG: "",
      dataLoaded: false,
    }
  }

  renderItem = (item) => {
    <View style = {styles.drinkContainer}>
    <TouchableOpacity style = {styles.buttonDrink}>
    <Image source = {{ uri: item.image }} style = {styles.imageDrink}/>

    </TouchableOpacity>
    </View>
  }
  async componentDidMount(){
    const url =''
    fetch(url)
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        dataSource: responseJson.book_array
      })
    })
    .catch((error) => {
      console.log(error)
    })

    var storageRef = firebaseStorage.ref();
    var imagesRef = storageRef.child('Drinkpictures')
    var vodkaRef = firebaseStorage.ref('Drinkpictures/Vodka.jpg')
    await vodkaRef.getDownloadURL().then((url) =>
    {
      this.setState({vodkaIMG : url})
    })
    this.setState({dataloaded : true})
    console.log(this.state.vodkaIMG)
    this.forceUpdate()
  }

  pageContent() {
    return(
      <SafeAreaView style={styles.container}>
      <View style ={styles.headerBox}>
      <Text style = {styles.textHeader}> Drinks </Text>
      </View>
      <View style = {styles.searchBox}>
      <View style = {styles.innerSearchBox}>
      <EvilIcons name= 'search' size={30}>
      </EvilIcons>
      <TextInput placeholder = 'Search' style={styles.searchInput}>
      </TextInput>
      <TouchableOpacity style={styles.buttonFilter}>
      <Text style = {styles.textFilterButton}>Filter</Text>
      </TouchableOpacity>
      </View>
      </View>

      <ScrollView scrollEventThrottle = {16}>
      <View style = {styles.drinkContainer}>
      <TouchableOpacity style = {styles.buttonDrink} onPress={() => this.props.navigation.navigate('SpecDrinks')}>
      <View>
      <Image source = {{ uri: this.state.vodkaIMG}} style = {styles.imageDrink}/>
      </View>
      <View style = {styles.textBoxContainer}>
      <Text style= {styles.textDrinkName}>
       Long Island Ice Tea
      </Text>
      <Text style = {styles.textDrinkIngredients}>
      Gin, White Rum, Tequila, Triple Sec, Vodka, Syrup, Lemon Juice, Cola, Ice
      </Text>
      </View>
      </TouchableOpacity>
      </View>
      </ScrollView>


      </SafeAreaView>
    )
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
      <View style ={styles.headerBox}>
      <Text style = {styles.textHeader}> Drinks </Text>
      </View>
      <View style = {styles.searchBox}>
      <View style = {styles.innerSearchBox}>
      <EvilIcons name= 'search' size={30}>
      </EvilIcons>
      <TextInput placeholder = 'Search' style={styles.searchInput}>
      </TextInput>
      <TouchableOpacity style={styles.buttonFilter}>
      <Text style = {styles.textFilterButton}>Filter</Text>
      </TouchableOpacity>
      </View>
      </View>

      <ScrollView scrollEventThrottle = {16}>
      <View style = {styles.drinkContainer}>
      <TouchableOpacity style = {styles.buttonDrink} onPress={() => this.props.navigation.navigate('SpecDrinks')}>
      <View>
      <Image source = {{ uri: this.state.vodkaIMG}} style = {styles.imageDrink}/>
      </View>
      <View style = {styles.textBoxContainer}>
      <Text style= {styles.textDrinkName}>
       Long Island Ice Tea
      </Text>
      <Text style = {styles.textDrinkIngredients}>
      Gin, White Rum, Tequila, Triple Sec, Vodka, Syrup, Lemon Juice, Cola, Ice
      </Text>
      </View>
      </TouchableOpacity>
      </View>
      </ScrollView>


      </SafeAreaView>
    );
  }
}
export default Drinkscreen;

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  textHeader: {
    marginTop: 2.5,
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 25,

  },
  headerBox:{
    backgroundColor: 'white',
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd'
  },
  searchBox:{
    height:70,
    borderBottomWidth:1,
    borderBottomColor:'#dddddd',
    backgroundColor: 'rgba(236, 236, 236, 1)',
    justifyContent: 'center'
  },
  innerSearchBox:{
    height:40,
    backgroundColor: 'white',
    alignItems: 'center',
    marginLeft:10,
    paddingLeft: 5,
    flexDirection: 'row',
    marginRight: WIDTH/5
  },
  searchInput:{
    backgroundColor:'white',
    width: WIDTH-(WIDTH/2.9),
    fontSize:24,
    marginLeft:10,
  },
  buttonFilter:{
    marginLeft: 20,
    backgroundColor: 'white',
    height:40,
    justifyContent: 'center',
    padding:10,
    borderRadius: 5,

  },
  textFilterButton:{
    color: 'rgba(0,0,0,0.9)',
    fontSize: 14,
    textAlign: 'center'
  },
  drinkContainer:{
    height:105,
    width: WIDTH,
    borderBottomWidth:1,
    borderBottomColor:'#dddddd',
    flexDirection: 'row',
  },
  buttonDrink:{
    backgroundColor:'white',
    flex:1,
    flexDirection: 'row'
  },
  imageDrink:{
    height:105,
    width: 105
  },
  textDrinkName:{
    fontSize: 18,
    fontWeight:'bold',
    marginLeft:15,
    marginTop:15,
    color: 'rgba(46, 49, 49, 1)',
    marginRight:10
  },
  textDrinkIngredients:{
    fontSize: 14,
    marginLeft:15,
    marginTop:15,
    color: 'rgba(108, 122, 137, 1)'
  },
  textBoxContainer:{
    width: WIDTH -105,
  }


});
