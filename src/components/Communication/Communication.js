import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  TouchableHighlight,
  Picker
} from 'react-native';
import t from "tcomb-form-native";
var Form = t.form.Form;
var Language = t.enums({
  ru: "Russian",
  es: "Spanish",
  fr: "French"
});

var Translate = t.struct({
  Question: t.String, // a required string
  Language: Language // enum       // a boolean
});

const options ={};
const key = 'trnsl.1.1.20180212T211757Z.c491e9368fbc18e5.1cbb4b5472e08eb131aa08a7f21b2491d704606a';

class CommunicationScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      translatedWords: [],
      language: "ru",
      text: "",
    }
  }


  translate(){
    var language = this.state.language;
    var text = this.state.text;
    fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&lang=${language}&text=${text}`)
    .then(data => {
      return data.json()
    })
    .then(response => {
      console.log(response.text)
      this.setState({
        translatedWords: response.text[0] 
      })
    })
    .catch(err => console.log("This is an error "+ err))
  }

  render() {
    return (
      <ScrollView>
         <TextInput
         multiline = {true}
         numberOfLines = {4}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text: text})}
        value={this.state.text}
      />
        <Picker
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          <Picker.Item label="Russian" value="ru" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
          <Picker.Item label="Chinese" value="zh" />
        </Picker>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.translate()}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Translate</Text>
        </TouchableHighlight>

        <Text>{this.state.translatedWords}</Text>
       
</ScrollView>
    );
  }
}

var styles = StyleSheet.create({
 
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  },
  button: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});

export default CommunicationScreen;