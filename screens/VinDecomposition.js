import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
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
      basicInfo: [],
      Year: null,
      Make: null,
      Model: null,
    };
  }

  componentDidMount() {
  }

  render() {
    let vin =  "WP0AA2994VS320240" //this.props.navigation.getParam('vin'); // //= "2FTPX28L0XCA15511"//
    // It looks like the general consensus is that you should strip the I character
    // if and only if the VIN number is longer than 17 characters. If you do that,
    // you should be able to parse all of the codes correctly.
    if (vin.length > 17 && vin[0].toUpperCase() == 'I') {
      vin = vin.slice(1); // slice takes start and end. This returns array from index 1 to end
    }
    // this.getData(vin)
    //
    // if (this.state.isLoading) {
    //   return
    // }


    const listArray = this.state.basicInfo;
    console.log(listArray)


    const { Year, Make, Model } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.vin}>
            <Text style={styles.Variable}>VIN:</Text>
            <Text style={styles.Value}>{vin}</Text>
          </View>
          <Button
            onPress={() => this.getData(vin)}
            title="Get Data"
          />
        </View>

        <FlatList
          data={listArray}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.Variable}>{item.Variable}: </Text>
              <Text style={styles.Value}>{item.Value}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

      </View>

    );
  }

  async getData(vin) {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${vin}*BA?format=json`;
    await axios.get(url, {
    })
      .then((response) => {
        vehicleData = [];
        response.data.Results.forEach((entry) => {
          if (entry.Value) {
            vehicleData.push(entry);
          }
        });

        const { Make, Model } = vehicleData;
        const Year = vehicleData['Model Year'];

        this.setState({
          isLoading: false,
          dataSource: response.data.Results,
          basicInfo: vehicleData,
          Year,
          Make,
          Model,
        });
      })
      .catch((error) => {
        alert(error);
      });
  }

  takePicture = async () => {
  };
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  vin:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  vinText: {
    fontFamily: 'Avenir',
    fontSize: 17,
  },
  row: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: '100%',
  },
  Variable: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 17,
  },
  Value: {
    fontFamily: 'Avenir',
    fontSize: 17,
    maxWidth: '60%',
  },
});

export default VinDecomposition;
