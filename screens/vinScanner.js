import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  CameraRoll,
  View,
  Alert,
} from 'react-native';

import MaskedView from '@react-native-community/masked-view';

import { RNCamera } from 'react-native-camera';

class VinScanner extends React.Component {
  render() {
    let checkAndroidPermission = true
    if (Platform.OS === 'android' && Platform.Version < 23) {
      checkAndroidPermission = false
    }
    return (

      <MaskedView
        style={{flex: 1, flexDirection: 'row', height: '100%', color:'red'}}
        maskElement={
          <View
            style={{
              // Transparent background because mask is based off alpha channel.
              backgroundColor: 'rgba(92, 52, 52, 0.4)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: '40%',
                width: '95%',
                backgroundColor: 'black',
                color: 'black',
                fontWeight: 'bold',
              }}>
            </View>
            <Text style={{fontSize:20, padding:20}}>Scan Your Vin Sticker</Text>
          </View>
        }>
        {/* Shows behind the mask, you can put anything here, such as an image */}
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            barcodeFinderVisible={true}
            barcodeFinderWidth={280}
            barcodeFinderHeight={220}
            barcodeFinderBorderColor="white"
            barcodeFinderBorderWidth={2}
            style={styles.preview}
            cameraProps={{
              captureAudio: false,
              barcodeFinderVisible: true,
            }}
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: 'red',
              borderRadius: 3,
              borderColor: 'red'
            }}
          >
          </RNCamera>
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'pink' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> Enter Vin Manually </Text>
            </TouchableOpacity>
          </View>
        </View>
      </MaskedView>

    );
  };
  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5};
      const data = await this.camera.takePictureAsync(options);
      CameraRoll.saveToCameraRoll(data.uri,'photo');
      alert("yo")
      console.log(data.uri);
    }
  };
  onBarCodeRead = async(scanResult) => {
    // alert(`VIN: ${scanResult.data}`)
    const vin = scanResult.data
    this.props.navigation.navigate('Details',{vin})
    console.log("------------------------------------------------")
    console.warn(scanResult.data)
    console.log("------------------------------------------------")

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

export default VinScanner;
