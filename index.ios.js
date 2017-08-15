/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';

import TasksList from './app/components/TasksList';

export default class Tasks extends Component {
  render() {
    return (
      <View>
        <TasksList />
      </View>
    );
  }
}

AppRegistry.registerComponent('Tasks', () => Tasks);
