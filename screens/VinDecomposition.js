import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
} from 'react-native';

const axios = require('axios');

class VinDecomposition extends React.Component {


  render() {
    const vin = '123123123123';//this.props.navigation.getParam('vin')
    return(
      <View>
        <Text>{vin}</Text>
        <Button
        onPress={this.getData}
        title='Get Data'
        />
      </View>

    )
  };
  async getData(){
    await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/5UXWX7C5*BA?format=json&modelyear=2011', {
      })
      .then(function (response) {
        console.log(response.data)
        // alert(JSON.stringify(response.data))
      })
      .catch(function (error) {
        alert(error)
      });


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
});

export default VinDecomposition;
