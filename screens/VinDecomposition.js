import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';

const axios = require('axios');


class VinDecomposition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: null,
    }
  }

  componentDidMount() {

  }

  render() {
    let vin = this.props.navigation.getParam('vin')// = "WP0AA2994VS320240" // //= "2FTPX28L0XCA15511"//
    // It looks like the general consensus is that you should strip the I character
    // if and only if the VIN number is longer than 17 characters. If you do that,
    // you should be able to parse all of the codes correctly.
    if (vin.length > 17 && vin[0].toUpperCase() == 'I') {
      vin = vin.slice(1); //slice takes start and end. This returns array from index 1 to end
    }
    //
    // if (this.state.isLoading) {
    //   return
    // }
    console.log(vin)
    // let movies = this.state.dataSource.map();
    return(
      <View>
        <Text>{vin}</Text>
        <Button
        onPress={() => this.getData(vin)}
        title='Get Data'
        />

      </View>

    )
  };
  async getData(vin){
    console.log("this is the vin:" + vin)

    console.log('got here negro')
    console.log(vin.length > 17)
    console.log( vin[0].toUpperCase() == 'I')



    let url =`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${vin}*BA?format=json`
    console.log(url)
    await axios.get(url, {
      })
      .then(function (response) {

        // this.setState({
        //   isLoading: false,
        //   dataSource: response.data.Results,
        // })



        console.log(response.data.Results)
        // console.log(response.data.Results[6].Value)
        //
        let Brand = response.data.Results[6].Value;
        let Year = response.data.Results[9].Value;
        let Model = response.data.Results[8].Value;

        for (let i = 0; i<response.data.Results.length; i++){
          let value = response.data.Results[i].Value
          let variable = response.data.Results[i].Variable
          console.log(`${variable} = ${value}\n`)
        }

        console.log("haan")
        console.log(`Brand: ${Brand} \n Year: ${Year} \n Model: ${Model}`)
        const stringy = `Brand: ${Brand} \n Year: ${Year} \n Model: ${Model}`
        alert(stringy)
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
