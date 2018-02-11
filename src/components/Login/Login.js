import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';

import UserInput from "../UserInput";
import usernameImg from '../../../assets/images/username.png';
import passwordImg from '../../../assets/images/password.png';
import eyeImg from '../../../assets/images/eye_black.png';
import { DrawerNavigator } from "react-navigation";
import HomeScreenNavigator from "../HomeScreen/index.js";
import Wallpaper from '../Wallpaper'
import Logo from '../Logo'
import spinner from '../../../assets/images/loading.gif'

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      isLoading: false,
    };
    this.showPass = this.showPass.bind(this);
    this.submit = this.submit.bind(this)
  }

  showPass() {
    this.state.press === false ? this.setState({ showPass: false, press: true }) : this.setState({ showPass: true, press: false });
  }

  submit() {
    this.setState({
      isLoading: true
    })
    setTimeout(() => {
      this.props.navigation.navigate("Home")
      this.setState({
        isLoading: false
      })
    }, 2000);
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
        <View style={styles.container} >
          {this.state.isLoading ?
            <Image source={spinner} style={styles.image} /> :
            <Button onPress={this.submit} title="Login" style={styles.button} />
          }
        </View>
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
    top: 60,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  image: {
    width: 24,
    height: 24,
    alignItems: 'center',
    borderRadius: 20,
  },
  button: {
    height: 30,
    width: 60,
  }
});

const LoginScreenRouter = DrawerNavigator(
  {
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreenNavigator },
  },
  {
    initialRouteName: 'Login'
  }
);

export default LoginScreenRouter;