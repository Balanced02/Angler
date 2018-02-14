import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Picker, Button, Text } from "native-base";
import Expo from "expo";
import LoginScreen from "./src/components/Login/Login.js"
import Tabs from './src/router/config'

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    this.setState({ isReady: true });
  }

  render() {
    return (
      <Container style={styles.container} >
        {!this.state.isReady ? <Expo.AppLoading /> : <LoginScreen />}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 23,
    backgroundColor: '#fff',
  },
});
