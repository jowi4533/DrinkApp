import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Tagga valborg</Text>
        <Text>Tagga valborg</Text>
        <Text>Tagga valborg</Text>
        <Text>Tagga valborg</Text>
        <Text>Tagga valborg</Text>
        <Text>Tagga valborg</Text>
        <Text>Tagga valborg</Text>
        <Text>Tagga valborg</Text>
        <Text>Tagga valborg</Text>
        <Text>Tagga valborg</Text>
        <Text>Tagga valborg</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
