import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView
} from 'react-native';

const axios = require('axios');
import Groups from '../components/Groups';


class VinDecomposition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: null,
      vehicleData: [],
      yearMakeModel: [],
      otherData: [],
      Year: null,
      Make: null,
      Model: null,
    };
  }

  componentDidMount() {
  }

  render() {
    let vin =  'WP0AA2994VS320240'//this.props.navigation.getParam('vin'); //WP0AA2994VS320240 // //= "2FTPX28L0XCA15511"//
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


    const listArray = this.state.vehicleData;
    console.log(listArray)
    const myListEle = [{Value: "911" ,ValueId: "7832",Variable: "Model",VariableId: 28}]


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
            title="Scan Vin"
          />
        </View>
        <ScrollView>
          <Groups
            name={this.state.yearMakeModel}
            description={'Year Make Model'}
            details={this.state.yearMakeModel}
          />
          <Groups
            name={this.state.otherData}
            description={'Other Data'}
            details={this.state.otherData}
          />

        </ScrollView>



      </View>

    );
  }

  async getData(vin) {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${vin}*BA?format=json`;
    await axios.get(url, {
    })
      .then((response) => {
        otherData = [];
        yearMakeModel = [];
        response.data.Results.forEach((entry) => {
          if (entry.Value) {
            if (entry.Variable == 'Make' || entry.Variable == 'Model' || entry.Variable == 'Model Year'){
              yearMakeModel.push(entry)
            }
            else {
              otherData.push(entry)
            }
          }
        });
        console.log(otherData)
        const { Make, Model } = otherData;
        const Year = otherData['Model Year'];
        vehicleData = [...yearMakeModel, ...otherData]

        // let vehicle = [{Variable: 'Year', Value: Year},
        // {Variable: 'Make', Value: String(Make)},
        // {Variable: 'Model', Value: String(Model)}]
        // vehicleData = [...vehicle, ...vehicleData]
        console.log(vehicleData)

        this.setState({
          isLoading: false,
          dataSource: response.data.Results,
          vehicleData: vehicleData,
          yearMakeModel: yearMakeModel,
          otherData: otherData,
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
