import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation, route }) {

  const [email, setEmail] = useState('');

  useEffect(() => {
    validateUser();
  }, []) 

  const validateUser = () => {
    try {
      AsyncStorage.getItem('UserData')
        .then(value => {
          if (value != null) {
            let user = JSON.parse(value);
            setEmail(user.Email);
          }
        }

        )
    } catch (error) {
      console.log(error);
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('UserData');
      navigation.navigate('Auth');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome {email} !
      </Text>

      <TouchableOpacity
        style={styles.userBtn}
        onPress={logout}>
        <Text style={styles.btnText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFEFE3',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  userBtn: {
    backgroundColor: '#8AB594',
    padding: 15,
    marginTop: 100,
    bottom: 0,
    width: 300,
    fontFamily: 'Roboto',
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#Ffffff',
    fontFamily: 'Roboto',
  },
});
