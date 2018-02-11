import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import MainScreenNavigator from "../ChatScreen/index.js";
import ProfileScreen from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import Translator from '../Translateor/Translator'
import { DrawerNavigator } from "react-navigation";
import RegistrationScreenRouter from '../Registration/Registration';
const HomeScreenRouter = DrawerNavigator(
  {
    TranslateScreen: { screen: Translator },
    Home: { screen: HomeScreen },
    Chat: { screen: MainScreenNavigator },
    ProfileScreen: { screen: ProfileScreen },
    Registration: { screen: RegistrationScreenRouter}
  },  
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;