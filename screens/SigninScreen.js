import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity 
} from 'react-native';

export default class Signin extends Component<Props> {
    
  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign In To Your Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.userBtn}
        onPress={() => this.props.navigation.navigate('Content')}>
          <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>
    
      <Text style={styles.text2}>Don't Have An Account?
      <TouchableOpacity
      onPress={() => this.props.navigation.navigate('Sign Up')}>
          <Text style={styles.signup}>Sign Up</Text>
      </TouchableOpacity>
      </Text>
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
    fontSize: 22,
    alignItems: 'center',
    margin: 10,
    color: '#050505',
    marginBottom: 60,
    fontFamily: 'Roboto',
  },
  input:{
    width: 300,
    backgroundColor: '#Ffffff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 30,
  },
  
  userBtn: {
    backgroundColor: '#8AB594',
    padding: 15,
    marginTop: 100,
    bottom: 0,
    width: 300,
    fontFamily: 'Roboto',
  },

  btnText:{
    fontSize: 18,
    textAlign: 'center',
    color: '#Ffffff',
    fontFamily: 'Roboto',
  },

  text2:{
    fontSize: 12,   
    color: '#050505',
    bottom: 0,
    alignItems: 'flex-end',
  },

  signup:{
    fontSize: 12,
    marginLeft: 10,
    color: '#29502c',
    marginTop: 2,
    fontWeight: 'bold',
    bottom: 0,
  }

});
