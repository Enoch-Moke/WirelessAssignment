import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { CustomButton } from '../utilities/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
let config = require('../Config');

export default function Signin({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    validateUser();
  }, [])

  const validateUser = () => {
    try {
      AsyncStorage.getItem('UserData')
        .then(value => {
          if (value != null) {
            navigation.navigate('Content');
          }
        }

        )
    } catch (error) {
      console.log(error);
    }
  }

  const saveUser = async (user) => {
    try {
      var theUser = {
        Name: user.name,
        Email: user.email,
        Password: user.password,
        Age: user.age,
        Gender: user.gender
      }
      await AsyncStorage.setItem('UserData', JSON.stringify(theUser));
    } catch (error) {
      console.log(error);
    }
  }

  const handleSignIn = () => {
    if (email.length == 0 || password.length == 0) {
      Alert.alert('Warning', 'Please fill in email / password!');
      return;
    }

    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
      Alert.alert('Warning', 'Please enter a valid email address!');
      return;
    }

    let url = config.settings.serverPath + '/api/users/' + email;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Warning', 'No account found. Please register an account');
          throw Error('Error: ' + response.status);
        }
        return response.json();
      })
      .then(user => {
        if (user != null) {
          if (password === user.password) {
            setUser(user);
            saveUser(user);
            navigation.navigate('Content');
          } else {
            Alert.alert('Warning', 'Incorrect password. Please try again');
          }
        } else {
          Alert.alert('Warning', 'No account found. Please register an account');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
      <View style={styles.container}>
        <Text style={styles.text}>Sign In To Your Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={(value) => setPassword(value)}
        />
        <CustomButton
          title='Sign In'
          onPress={handleSignIn}
        />
        <Text style={styles.text2}>Don't Have An Account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
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
  input: {
    width: 300,
    backgroundColor: '#Ffffff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 30,
  },
  text2: {
    fontSize: 12,
    color: '#050505',
    bottom: 0,
    alignItems: 'flex-end',
  },
  signup: {
    fontSize: 12,
    marginLeft: 10,
    color: '#29502c',
    marginTop: 2,
    fontWeight: 'bold',
    bottom: 0,
  }
});