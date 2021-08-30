import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { CustomButton } from '../utilities/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
let config = require('../Config');

const SignupScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userGender, setUserGender] = useState('Male');

  const handleSignUp = () => {
    if (userName.length == 0) {
      Alert.alert('Warning', 'Please fill name');
      return;
    }

    if (userEmail.length == 0) {
      Alert.alert('Warning', 'Please fill email');
      return;
    }

    if (!userEmail.includes("@") && !userEmail.includes(".")) {
      Alert.alert('Warning', 'Please enter a valid email address');
      return;
    }

    if (userPassword.length == 0) {
      Alert.alert('Warning', 'Please fill password');
      return;
    }

    if (userAge.length == 0) {
      Alert.alert('Warning', 'Please fill age');
      return;
    }

    let url = config.settings.serverPath + '/api/users';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPassword,
        age: userAge,
        gender: userGender,
      }),
    }).then((response) => {
      if (!response.ok) {
        Alert.alert('Error', response.status.toString());
        throw Error('Error: ' + response.status);
      }

      return response.json()
    }).then((responseJson) => {
      if (responseJson.affected > 0) {
        setUser();
        navigation.navigate('Content');
      }
      else {
        console.log('respond')
        console.log(responseJson.affected);
        Alert.alert('Error saving record');
      }
    })
      .catch((error) => {
        console.error(error);
      });
  };

  const setUser = async () => {
    try {
      var theUser = {
        Name: userName,
        Email: userEmail,
        Password: userPassword,
        Age: userAge,
        Gender: userGender
      }
      await AsyncStorage.setItem('UserData', JSON.stringify(theUser));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>

      <TextInput
        style={styles.input}
        numberOfLines={1}
        placeholder="Enter Your Name"
        placeholderTextColor="#778899"
        onChangeText={(UserName) => setUserName(UserName)}
      />

      <TextInput
        style={styles.input}
        numberOfLines={1}
        placeholder="Enter Your Email"
        placeholderTextColor="#778899"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(UserEmail) => setUserEmail(UserEmail)}
      />

      <TextInput
        style={styles.input}
        numberOfLines={1}
        placeholder="Enter Password"
        placeholderTextColor="#778899"
        secureTextEntry={true}
        onChangeText={(UserPassword) =>
          setUserPassword(UserPassword)
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Your Age"
        placeholderTextColor="#778899"
        keyboardType="numeric"
        onChangeText={(UserAge) => setUserAge(UserAge)}
      />

      <TouchableOpacity style={styles.dropdown}>
        <Picker
          selectedValue={userGender}
          onValueChange={(itemValue, itemIndex) =>
            setUserGender(itemValue)
          }
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </TouchableOpacity>

      <View>
        <CustomButton
          title='Sign Up'
          onPress={handleSignUp}
        />

        <Text style={styles.text2}>Already have an account?
          <TouchableOpacity
            onPress={() => navigation.navigate('Sign In')}>
            <Text style={styles.signin}>Sign In</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

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
    marginBottom: 30,
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
  signin: {
    fontSize: 12,
    marginLeft: 10,
    color: '#29502c',
    marginTop: 2,
    fontWeight: 'bold',
    bottom: 0,
  },
  dropdown: {
    width: 300,
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 30,
  },
});

export default SignupScreen;