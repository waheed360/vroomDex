import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';

const axios = require('axios');


class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      expand: false,
      what: "+",
      details: null,
    };
  }

  componentDidMount() {
  }

  renderDetails(list) {
    return(
      <FlatList
        scrollEnabled={false}
        data={list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.Variable}>{item.Variable}: </Text>
            <Text style={styles.Value}>{item.Value}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback  onPress={this.takePicture}>
          <View style={styles.topLevel} >
            <Text>icon</Text>
            <Text>{this.props.description}</Text>
            <Text>{this.state.what}</Text>
          </View>
        </TouchableWithoutFeedback>
        {this.state.expand && this.renderDetails(this.props.details)}


      </View>

    );
  }

  takePicture = async () => {
    this.setState({
      what: this.state.expand ? '+' : '-',
      expand: !(this.state.expand)
    });
  };
}

const styles = StyleSheet.create({
  topLevel: {
    width: '100%',
    height: 45,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  container: {
    backgroundColor: 'gray',
    flexDirection: 'column',
    marginTop: 2,
    marginTop: 2,
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

export default Groups;
