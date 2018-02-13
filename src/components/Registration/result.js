import React from "react";
import { AppRegistry, View, StatusBar } from "react-native";
import QRCode from 'react-native-qrcode';
import {
  StyleSheet,
  TextInput
} from 'react-native';

export default class Data extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        text: 'http://facebook.github.io/react-native/',    
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        />
        <QRCode
          value={this.state.text}
          size={200}
          bgColor='purple'
          fgColor='white'/>
      </View>
    );
  }
}