import React from "react";
import { Text,
     View, 
     StyleSheet,
      Dimensions } from "react-native";
import { StackNavigator } from "react-navigation"; // 1.0.3
import { Constants } from "expo";

class Full extends React.Component {
  static navigationOptions = {
    title: "All Contacts"
  };

  
  render() {
    return (
      <View>
        <Text style={{ width: 200, backgroundColor: "yellow", height: 20 }}>
          List of all conhtacts
        </Text>
      </View>
    );
  }
}

export default Full;
