import React, { Component } from 'react';
import {
  ListView,
  Text,
  TextInput,
  View
} from 'react-native';
import styles from './styles';

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

  _addTask() {
    const listOfTasks = [...this.state.listOfTasks, this.state.text];
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

  _renderRowDate(rowData) {
    return (
      <Text>{rowData}</Text>
    )
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
          renderRow={(rowData) => this._renderRowDate(rowData)}
        />
      </View>
    );
  }
}
