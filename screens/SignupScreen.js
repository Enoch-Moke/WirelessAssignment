import React from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet, TextInput } from 'react-native';

const SignupScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      
      <TextInput
          style={styles.input}
          numberOfLines={1}
          placeholder="Enter Your Name"
          placeholderTextColor="#778899"
        />

        <TextInput
          style={styles.input}
          numberOfLines={1}
          placeholder="Enter Your Email"
          placeholderTextColor="#778899"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          numberOfLines={1}
          placeholder="Enter Password"
          placeholderTextColor="#778899"
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          numberOfLines={1}
          placeholder="Confirm Password"
          placeholderTextColor="#778899"
          secureTextEntry={true}
        />

      <TouchableOpacity
      style={styles.buttonContainer}
      //onPress={() => register(email, password)}
        onPress={() => navigation.navigate('User Details')}
      >
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.text2}>Already have an account? 
      <TouchableOpacity
      onPress={() => navigation.navigate('Sign In')}>
          <Text style={styles.signin}>Sign In</Text>
      </TouchableOpacity>
      </Text>

    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DFEFE3',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 22,
    alignItems: 'center',
    margin: 10,
    color: '#050505',
    marginBottom: 60,
    fontFamily: 'Roboto',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
  buttonContainer: {
    marginTop: 10,
    width: 300,
    backgroundColor: '#8AB594',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    fontFamily: 'Roboto',
  },
  btnText:{
    fontSize: 18,
    textAlign: 'center',
    color: '#Ffffff',
    fontFamily: 'Roboto',
  },
  inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',

        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
  },
  input:{
    width: 300,
    backgroundColor: '#Ffffff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 30,
  },
  text2:{
    fontSize: 12,   
    color: '#050505',
    bottom: 0,
    alignItems: 'flex-end',
  },
  signin:{
    fontSize: 12,
    marginLeft: 10,
    color: '#29502c',
    marginTop: 2,
    fontWeight: 'bold',
    bottom: 0,
  }
});