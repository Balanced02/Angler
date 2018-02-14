import React, { Component, PropTypes } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Container,
  Alert,
  TextInput,
  TouchableHighlight,
  Header,
  Title,
  Left,
  Picker,
  Button,
  Body,
  Icon,
  Right
} from "react-native";

import { Moment } from "moment";
import CalendarPicker from 'react-native-calendar-picker';
import UserInput from "../UserInput";
import ButtonSubmit from "../ButtonSubmit.js";
import { DrawerNavigator } from "react-navigation";
import DataScreen from "./result.js";
import Wallpaper from "../Wallpaper";
import Logo from "../Logo";
import PouchDB from "pouchdb-react-native";
import PouchFind from "pouchdb-find";
import Credentials from "./credentials";
import { Camera, Permissions } from "expo";

PouchDB.plugin(PouchFind);
const db = new PouchDB("angler");
const remoteCouch = Credentials.cloudant_url;


class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedItem: undefined,
      selected1: "key1",
      showToast: false,
      results: {
        items: []
      },
      showPass: true,
      press: false,
      fullName:"",
      gender: null,
      occupation:"",
      PlaceOfReg:"",
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
    };
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }


  onPress() {
    // call getValue() to get the values of the form
    this.createPouchNote();
  }

  onValueChange(value) {
    this.setState({
      selected1: value
    });
  }

  getPouchNotes() {
    // const Username = this.props.user.username;

    db
      .find({
        selector: { username: this.props.user._doc.username },
        fields: ["_id", "username", "date", "_rev", "body", "done"]
      })
      .then(data => {
        this.setState({
          noteList: {
            ...this.state.noteList,
            notes: data.docs
          }
        });
      })
      .catch(err => console.log(err));
  }

  createPouchNote() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    const date = new Date().toISOString();
    var Person = {
      _id: date,
      name: this.state.fullName,
      gender: this.state.gender,
      location: this.state.PlaceOfReg,
      occupation: this.state.occupation,
      DOB: startDate
    };
    db
      .put(Person)
      .then(data => {
        // this.getPouchNotes();
        console.log(data);
        this.setState({ 
          occupation: "",
          fullName: "",
          PlaceOfReg: "",
          gender: ""
         });
      })
      .catch(err => {
        console.log(err)
    });
  }

  createPouchNoteDemo() {
    Alert.alert("Success", this.state.formData.name, [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]);
  }

  onChange(value) {
    this.setState({ formData });
  }


  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  takePicture() {
    this.camera
      .capture()
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  componentDidMount() {
    db
      .sync(remoteCouch, {
        live: true,
        retry: true,
        auth: {
          username: "andeesiduritheyedstivian",
          password: "170568b45531e9cd87917501fa78bbc02abd58f8"
        }
      })
      .on("change", change => {
        console.log("something changed!");
        this.getPouchNotes();
      })
      .on("paused", info => console.log("replication paused."))
      .on("active", info => console.log("replication resumed."))
      .on("error", err => console.log(err + "uh oh! an error occured."));
  }



  render() {
    return (
      <View>
        <TextInput
        label="Full Name"
        placeholder = "Enter Full Name"
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({fullName: text})}
        value={this.state.fullName}
      />
        <Picker
          selectedValue={this.state.gender}
          label = "Gender"
          onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
          <Picker.Item label="Female" value="F" />
          <Picker.Item label="Male" value="M" />
        </Picker>
        <TextInput
        label="Occupation"
        placeholder = "Enter Occupation"
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({occupation: text})}
        value={this.state.occupation}
      /><TextInput
      label="Place of Registration"
      placeholder = "Enter location for Registration"
      style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      onChangeText={(text) => this.setState({PlaceOfReg: text})}
      value={this.state.PlaceOfReg}
    /> 
    <CalendarPicker
          label= "Date of Birth"
          onDateChange={(date) => this.onDateChange(date)}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.takePicture()}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Take Picture</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => this.onPress()}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff"
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 30
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
  }
});


export default RegistrationScreen;
