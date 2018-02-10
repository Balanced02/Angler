import React, { Component } from "react";
import LoginScreen from "./Login.js";
import HomeScreenNavigator from "../HomeScreen/index.js";
import MainScreenNavigator from "../ChatScreen/index.js";
import ProfileScreen from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { StackNavigator } from "react-navigation";

const LoginScreenRouter = StackNavigator(
  {
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreenNavigator },
    Chat: { screen: MainScreenNavigator },
    ProfileScreen: { screen: ProfileScreen },
  },
  {
    initialRouteName: 'Login'
  }
);
export default LoginScreenRouter;