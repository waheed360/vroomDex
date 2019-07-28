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
      make:null,
      year:null,
      model:null,
    }
  }

  componentDidMount() {

  }

  render() {
    let vin = "2FTPX28L0XCA15511"//this.props.navigation.getParam('vin')// = "WP0AA2994VS320240" // //= "2FTPX28L0XCA15511"//
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
    let array = this.state.dataSource;
    let { make,year,model } = this.state;

    // let movies = array ? array.map() : null;
    return(
      <View>
        <Text>{vin}</Text>
        <Button
        onPress={() => this.getData(vin)}
        title='Get Data'
        />
        <Text> Make: {make}</Text>
        <Text> Year: {year}</Text>
        <Text> Model: {model}</Text>
        <Button
        onPress={() => this.getOil()}
        title='Get Oil'
        />



      </View>

    )
  };
  async getData(vin){
    console.log("this is the vin:" + vin)
    let url =`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${vin}*BA?format=json`
    console.log(url)
    await axios.get(url, {
      })
      .then( response => {







        // console.log(response.data.Results)
        // console.log(response.data.Results[6].Value)
        //

        let myVehicleData = {};
        for (let i = 0; i<response.data.Results.length; i++){
          let value = response.data.Results[i].Value
          let variable = response.data.Results[i].Variable
          myVehicleData[variable] = value;
          // console.log(`${variable} = ${value}\n`)
        }
        let make = myVehicleData.Make;
        let year = myVehicleData.Model;
        let model = myVehicleData["Model Year"];
        console.log("rehan")
        console.log(make,model,year)
        console.log(myVehicleData)

        const stringy = `make: ${make} \n year: ${year} \n model: ${model}`
        this.setState({
          isLoading: false,
          dataSource: response.data.Results,
          make,
          year,
          model,
        })
      })
      .catch(function (error) {
        alert(error)
      });


  };
  async getOil(){
    console.log("in oil")
    let url =`https://api.auto-data.net/?code=435e373c56a10fd2d4cbe3c2eb139906`
    console.log(url)
    await axios.get(url, {
      })
      .then( response => {
        console.log(response.data)

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
