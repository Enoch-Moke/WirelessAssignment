import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
} from 'react-native';

export default class Search extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Search Screen
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFEFE3',
  },
  title: {
    fontSize: 48,
    textAlign: 'center',
    margin: 20,
    fontFamily: 'Roboto',
  },
});
