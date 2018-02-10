import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import UserInput from "../UserInput";
import usernameImg from '../../../assets/images/username.png';
import passwordImg from '../../../assets/images/password.png';
import eyeImg from '../../../assets/images/eye_black.png';
import ButtonSubmit from '../ButtonSubmit.js'
import { DrawerNavigator } from "react-navigation";
import DataScreen from "./reult.js";
import Wallpaper from '../Wallpaper'
import Logo from '../Logo'
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import Credentials from './credentials';


PouchDB.plugin(PouchFind);
const db = new PouchDB('angler');
const remoteCouch = Credentials.cloudant_url;


class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      formData:{}
    };
    this.showPass = this.showPass.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  getPouchNotes() {
    // const Username = this.props.user.username;

    db
      .find({
        selector: { username: this.props.user._doc.username },
        fields: ['_id', 'username', 'date', '_rev', 'body', 'done'],
      })
      .then(data => {
        this.setState({
          noteList: {
            ...this.state.noteList,
            notes: data.docs,
          },
        });
      })
      .catch(err => console.log(err));
  }

  editNote(e) {
    this.setState({
      todo: {
        ...this.state.todo,
        body: e.target.value,
      },
    });
    console.log(this.state.todo.body);
  }

  createPouchNote() {
    if (check === '' || null) {
      message.error('The field must be filled');
      let check = this.state.todo.body.trim();
    } else {
      console.log('adding... ' + this.props.user._doc.username);
      const date = new Date().toISOString();
      var todo = {
        _id: this.props.user._doc.username + date,
        body: this.state.todo.body,
        username: this.props.user._doc.username,
        done: false,
        date: new Date(),
      };
      db
        .put(todo)
        .then(data => {
          message.info('New Note Added');
          this.getPouchNotes();
        })
        .catch(err => message.error('Error Creating Note'));
      this.setState({
        todo: {
          ...this.state.todo,
          body: '',
        },
      });
    }
  }


  onSubmit() {
    this.props.navigation.navigator('Home');
  }
  showPass() {
    this.state.press === false ? this.setState({ showPass: false, press: true }) : this.setState({ showPass: true, press: false });
  }


  componentDidMount(){
    db
    .sync(remoteCouch, {
      live: true,
      retry: true,
      auth: {
        username: 'nglostopseeirecaterandou',
        password: '431db08c504a7569bc81e012b141cb32d16e99c2',
      },
    })
    .on('change', change => {
      console.log('something changed!');
      this.getPouchNotes();
    })
    .on('paused', info => console.log('replication paused.'))
    .on('active', info => console.log('replication resumed.'))
    .on('error', err => console.log('uh oh! an error occured.'));
  }


  render() {
    return (
      <Wallpaper>
        <Logo />
        <KeyboardAvoidingView behavior='padding'
          style={styles.container}>
          <UserInput source={usernameImg}
            placeholder='Username'
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false} />
          <UserInput source={usernameImg}
            placeholder='Username'
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false} />
          <UserInput source={usernameImg}
            placeholder='Username'
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false} />
          <UserInput source={usernameImg}
            placeholder='Username'
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false} />
          <UserInput source={passwordImg}
            secureTextEntry={this.state.showPass}
            placeholder='Password'
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnEye}
            onPress={this.showPass}
          >
            <Image source={eyeImg} style={styles.iconEye} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      <ButtonSubmit submit={this.onSubmit} />
      </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});

const LoginScreenRouter = Navigator(
  {
    Register: { screen: ReigigterScreen },
    Data: { screen: DataScreen },
  },
  {
    initialRouteName: 'Register'
  }
);

export default RegistrationScreenRouter;