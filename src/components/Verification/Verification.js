import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import PouchDB from "pouchdb-react-native";
import PouchFind from "pouchdb-find";
import Credentials from "../Registration/credentials";


PouchDB.plugin(PouchFind);
const db = new PouchDB("angler");
const remoteCouch = Credentials.cloudant_url;
export default class VerificationScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    id: []
  }

  getPouchNotes() {
    // const Username = this.props.user.username;

    db.allDocs({
      include_docs: true,
      attachments: true
    })
      .then(data => {
        console.log("From the endpoint"+data.rows);
        this.setState({
          id: data.rows                                                                                                                                             
        });
      })
      .catch(err => console.log(err));
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
   const notes = await this.getPouchNotes()  
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {

    if(this.state.id.length != 0){
      
      console.log(this.state.id[0])
      alert(`User with id: ${this.state.id[0].id} verified!`);
    }
    else{
      alert("Could not verify this user")
    }
    
  }
}