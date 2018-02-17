import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  TouchableHighlight,
  Picker,
  Dimensions
} from 'react-native';
import { Constants, Speech } from 'expo';

const EXAMPLES = [
  { language: 'en', text: 'Hello world' },
  { language: 'es', text: 'Hola mundo' },
  { language: 'en', text: 'Charlie Cheever chased a chortling choosy child' },
  { language: 'en', text: 'Adam Perry ate a pear in pairs in Paris' },
];

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

const options = {};
const key = 'trnsl.1.1.20180212T211757Z.c491e9368fbc18e5.1cbb4b5472e08eb131aa08a7f21b2491d704606a';

class CommunicationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedWords: [],
      language: "ru",
      text: "",
      selectedExample: EXAMPLES[0],
      inProgress: false,
      pitch: 1,
      rate: 0.75,
    }
  }


  translate() {
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
      .catch(err => console.log("This is an error " + err))
  }

  render() {
    return (
      <ScrollView style={styles.container} >
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.input}
          onChangeText={(text) => this.setState({ text: text })}
          value={this.state.text}
        />
        <Picker
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
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

        <Text style={styles.translated} >{this.state.translatedWords}</Text>
        <Button
            disabled={this.state.inProgress}
            onPress={this._speak}
            title="Speak"
          />

            <Button
            disabled={!this.state.inProgress}
            onPress={this._stop}
            title="Stop"
          />
      </ScrollView>
    );
  }

  _speak = () => {
    const start = () => {
      this.setState({ inProgress: true });
    };
    const complete = () => {
      this.state.inProgress && this.setState({ inProgress: false });
    };

    Speech.speak(this.state.translatedWords, {
      language: this.state.language,
      pitch: this.state.pitch,
      rate: this.state.rate,
      onStart: start,
      onDone: complete,
      onStopped: complete,
      onError: complete,
    });
  };

  _stop = () => {
    Speech.stop();
  };
}

var styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#ccccff",
    height: Dimensions.get('window').height
  },
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
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: "90%",
    margin:"auto",
    height: Dimensions.get('window').height / 3,
    marginHorizontal: 20,
    marginTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    borderColor: '#6666ff',
    borderWidth: 1,
    color: '#1919ff',
  },
  translated: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default CommunicationScreen;