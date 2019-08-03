import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
} from 'react-native';

const axios = require('axios');


class VinDecomposition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: null,
      basicInfo: {},
      Year: null,
      Make: null,
      Model: null,
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


    let listArray = this.state.basicInfo;






    let {Year, Make, Model } = this.state;
    return(
      <View>
        <Text>{vin}</Text>
        <Button
        onPress={() => this.getData(vin)}
        title='Get Data'
        />
        <FlatList
          data={listArray}
          renderItem={({item}) => <Text style={styles.item}>{item.Variable}: {item.Value}</Text>}
        />

      </View>

    )
  };
  async getData(vin){
    let url =`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${vin}*BA?format=json`
    await axios.get(url, {
      })
      .then( (response) => {
        vehicleData = [];
        response.data.Results.forEach((entry) =>{
          if (entry.Value) {
            vehicleData.push(entry);
          }
        });

        let { Make, Model } = vehicleData;
        let Year = vehicleData['Model Year'];

        this.setState({
          isLoading: false,
          dataSource: response.data.Results,
          basicInfo:vehicleData,
          Year,
          Make,
          Model,
        })
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default VinDecomposition;
