import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  ImageBackground,
} from 'react-native';

import bgSrc from '../../assets/images/wallpaper.png';

export default class Wallpaper extends Component {
  render() {
    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        {this.props.children}
      </ImageBackground >
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
  },
});