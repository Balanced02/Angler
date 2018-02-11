import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import MainScreenNavigator from "../ChatScreen/index.js";
import ProfileScreen from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
import RegistrationScreenRouter from '../Registration/Registration';
const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Chat: { screen: MainScreenNavigator },
    ProfileScreen: { screen: ProfileScreen },
    Registration: { screen: RegistrationScreenRouter}
  },
  {
    initialRouteName: 'Home'
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;