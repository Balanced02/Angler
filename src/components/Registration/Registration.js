import React, { Component, PropTypes } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
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
  Toast,
  Button,
  Body,
  Icon,
  Right
} from "react-native";
import t from "tcomb-form-native";
import UserInput from "../UserInput";
import usernameImg from "../../../assets/images/username.png";
import passwordImg from "../../../assets/images/password.png";
// import RNFetchBlob from 'react-native-fetch-blob'
// import ImagePicker from 'react-native-image-crop-picker'
import eyeImg from "../../../assets/images/eye_black.png";
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

var Form = t.form.Form;

var Gender = t.enums({
  M: "Male",
  F: "Female"
});

var Person = t.struct({
  name: t.String, // a required string
  occupation: t.maybe(t.String), // an optional string
  DOB: t.String, // a required number
  PlaceOfReg: t.String,
  gender: Gender // enum       // a boolean
});

var options = {
  fields: {
    name: {
      label: "Name", // <= label for the name field
      placeholder: "Please enter your name"
    },

    occupation: {
      label: "Occupation",
      placeholder: "Enter your Occupation"
    },
    DOB: {
      label: "Date Of Birth"
    },
    PlaceOfReg: {
      label: "Place of Registration",
      placeholder: "Enter the place of registraion"
    },
    gender: {
      label: "Gender"
    }
  }
};

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selected1: "key1",
      showToast: false,
      results: {
        items: []
      },
      showPass: true,
      press: false,
      formData: {},
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
    };
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
    const date = new Date().toISOString();
    var value = this.refs.form.getValue();
    var Person = {
      _id: date,
      name: value.name,
      gender: value.gender,
      location: value.PlaceOfReg,
      occupation: value.occupation
    };
    db
      .put(Person)
      .then(data => {
        // this.getPouchNotes();
        Toast.show({
          text: "Successfully Saved",
          position: "bottom",
          buttonText: "Okay"
        });
        this.setState({ formData: null });
      })
      .catch(err => { Toast.show({
        text: "Error",
        position: "bottom",
        buttonText: "Okay"
      })
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
      .on("error", err => console.log("uh oh! an error occured."));
  }



  render() {
    return (
      <View>
        <Form ref="form" type={Person}
         options={options} />
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
