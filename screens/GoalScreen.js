import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import RadioButton  from "../utilities/RadioButton"

export default class Goal extends Component {

  constructor() {
    super();

    this.state = {
      radioItems:
        [
          {
            label: 'Lose Weight',
            size: 16,
            color: '#050505',
            selected: true
          },

          {
            label: 'Maintain Weight',
            color: '#050505',
            size: 16,
            selected: false,
          },

          {
            label: 'Gain Weight',
            size: 16,
            color: '#050505',
            selected: false
          }
        ], selectedItem: ''
    }
  }

  componentDidMount() {
    this.state.radioItems.map((item) => {
      if (item.selected == true) {
        this.setState({ selectedItem: item.label });
      }
    });
  }

  changeActiveRadioButton(index) {
    this.state.radioItems.map((item) => {
      item.selected = false;
    });

    this.state.radioItems[index].selected = true;

    this.setState({ radioItems: this.state.radioItems }, () => {
      this.setState({ selectedItem: this.state.radioItems[index].label });
    });
  }

  render() {
    return (
      <View style={styles.container} >

      <Text style={styles.text}>What Is Your Goal?</Text>
        {
          this.state.radioItems.map((item, key) =>
            (
              <RadioButton key={key} button={item} onClick={this.changeActiveRadioButton.bind(this, key)} />
            ))
        }

      <TouchableOpacity
      style={styles.userBtn}>
          <Text style={styles.btnText}
          onPress={() => this.props.navigation.navigate('Content')}>Next</Text>
      </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#DFEFE3',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedTextHolder: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: 15,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center'
    },
    selectedText: {
      fontSize: 18,
      color: 'white'
    },
    text: {
    fontSize: 22,
    alignItems: 'center',
    margin: 10,
    color: '#050505',
    marginBottom: 60,
    fontFamily: 'Roboto',
    },
    userBtn: {
      backgroundColor: '#8AB594',
      padding: 15,
      marginTop: 100,
      bottom: 0,
      width: 300,
    },

  btnText:{
    fontSize: 18,
    textAlign: 'center',
    color: '#Ffffff',
    fontFamily: 'Roboto',
  },


  });