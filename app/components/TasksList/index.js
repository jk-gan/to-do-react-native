import React, { Component } from 'react';
import {
  ListView,
  Text,
  TextInput,
  View,
  AsyncStorage
} from 'react-native';
import styles from './styles';

import TasksListCell from '../TasksListCell';

export default class TasksList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      listOfTasks: [],
      text: ''
    };
  }

  componentDidMount() {
    this._updateList();
  }

  async _addTask() {
    const singleTask = {
      completed: false,
      text: this.state.text
    };

    const listOfTasks = [...this.state.listOfTasks, this.state.text];

    await AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));

    this._updateList();
  }

  async _updateList() {
    let response = await AsyncStorage.getItem('listOfTasks');
    let listOfTasks = await JSON.parse(response) || [];

    this.setState({
      listOfTasks
    });

    this._changeTextInputValue('');
  }

  _changeTextInputValue(text) {
    this.setState({
      text
    });
  }

  _renderRowDate(rowData, rowID) {
    return (
      <TasksListCell
        completed={rowData.completed}
        id={rowID}
        onPress={(rowID) => this._completeTask(rowID)}
        text={rowData.text}
      />
    )
  }

  async _completeTask(rowID) {
    const singleUpdatedTask = {
      ...this.state.listOfTasks[rowID],
      completed: !this.state.listOfTasks[rowID].completed
    };

    const listOfTasks = this.state.listOfTasks.slice();
    listOfTasks[rowID] = singleUpdatedTask;

    await AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));
    this._updateList();
  }

  render () {
    const dataSource = this.state.ds.cloneWithRows(this.state.listOfTasks);
    return (
      <View style={styles.container}>
        <Text>sdsasd
        </Text>
        <TextInput
          autoCorrect={false}
          onChangeText={ (text) => this._changeTextInputValue(text) }
          onSubmitEditing={ () => this._addTask() }
          returnKeyType={'done'}
          style={styles.textInput}
          value={this.state.text}
        />
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={(rowData, sectionID, rowID) => this._renderRowDate(rowData, rowID)}
        />
      </View>
    );
  }
}
