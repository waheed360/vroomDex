import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  CameraRoll,
  View,
  Alert,
  MaskedViewIOS
} from 'react-native';

import { RNCamera } from 'react-native-camera';

class VinDecomposition extends React.Component {

  render() {
    const vin = this.props.navigation.getParam('vin')
    return <Text>{vin}</Text>
  };
  takePicture = async() => {

  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 2,
    borderColor: 'red'
  },
  mask: {
    backgroundColor: 'red',
    color: 'red',
    opacity: 0.1
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default VinDecomposition;
