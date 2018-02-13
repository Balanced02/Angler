import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import RegistrationScreen from '../components/Registration/Registration';
import CommunicationScreen from '../components/Communication/Communication';
import VerificationScreen from "../components/Verification/Verification";


export default Tabs = TabNavigator({
    Register: {
      screen: RegistrationScreen,
      navigationOptions: {
        tabBarLabel: 'Register',
        tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
      },
    },
    Verify: {
      screen: VerificationScreen,
      navigationOptions: {
        tabBarLabel: 'Verify',
        tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
      },
    },
    Communicate: {
        screen: CommunicationScreen,
        navigationOptions: {
            tabBarLabel: 'Communicate',
            tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
          },
    }
  });