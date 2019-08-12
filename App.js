/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import VinScanner from './screens/VinScanner';
import VinDecomposition from './screens/VinDecomposition';


const AppNavigator = createStackNavigator(
  {
    Home: VinScanner,
    Details: VinDecomposition,
  },
  {
    initialRouteName: 'Details',
  },
);

export default createAppContainer(AppNavigator);
