import React, { Component } from "react";
import { Picker } from '@react-native-picker/picker';
import { 
  StyleSheet, 
  View, 
  Text,
  TextInput, 
  TouchableOpacity,
  Platform,
} from 'react-native';

export default class UserDetails extends Component {

  constructor(){
     super();
     this.state={
      selectedGender : ''
     }
   }

  render() {
    return (
      <View style={styles.container}>

      <Text style={styles.text}>Let Us Know More About You...</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Age (in years old)"
      />

      <TouchableOpacity style={styles.dropdown}>
      <Picker
          selectedValue={this.state.selectedGender}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedGender: itemValue})} >

          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />

      </Picker>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Your Height (in cm)"
      />
      <TextInput
        style={styles.input}
        placeholder="Your Weight (in Kg)"
      />
      <TouchableOpacity
        style={styles.userBtn}
        onPress={() => this.props.navigation.navigate('Goal')}>
          <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>

      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFEFE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 19,
    alignItems: 'center',
    margin: 10,
    color: '#050505',
    marginBottom: 40,
    fontFamily: 'Roboto',
  },
  input:{
    width: 300,
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 30,
  },
  dropdown:{
    width: 300,
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderRadius: 30,
  },
  
  userBtn: {
    backgroundColor: '#8AB594',
    padding: 15,
    marginTop: 50,
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
