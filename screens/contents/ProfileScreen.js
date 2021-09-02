import { blue } from '@material-ui/core/colors';
import React, { useState, useEffect, Component } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";
import { CustomButton } from '../../utilities/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";
let config = require('../../Config');


export default function Profile({ navigation, route }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const [oldPassword, setOldPassword] = React.useState(null);
  const [newPassword, setNewPassword] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    validateUser();
  }, [])

  const validateUser = () => {
    try {
      AsyncStorage.getItem('UserData')
        .then(value => {
          if (value != null) {
            let user = JSON.parse(value);
            setName(user.Name);
            setEmail(user.Email);
            setPassword(user.Password);
            setAge(user.Age);
            setGender(user.Gender);
          }
        })
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

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = () => {

    if (oldPassword.length == 0 || newPassword.length == 0 || confirmPassword.length == 0) {
      Alert.alert('Warning', 'Please fill in all the particulars.');
      return;
    }

    if (oldPassword != password) {
      Alert.alert(
        'Error',
        'Incorrect old password. Please try again.'
      );

      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
    else if (newPassword != confirmPassword) {
      Alert.alert(
        'Error',
        'Confirm password does not match with the new password. Please try again.'
      );

      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
    else {
      let url = config.settings.serverPath + '/api/users/' + email;
   
      fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
          email: email,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            Alert.alert('Error in updating the password: ', response.status.toString());
            throw Error('Error in updating the password: ' + response.status);
          }

          return response.json()
        })
        .then((responseJson) => {
          if (responseJson.affected > 0) {
            Alert.alert('Password Successfully Changed');

            saveUser();

            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setVisible(false);
          }
          else {
            Alert.alert('Error in changing password.');
            setVisible(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const saveUser = async () => {
    try {
      var theUser = {
        Name: name,
        Email: email,
        Password: newPassword,
        Age: age,
        Gender: gender
      }
      await AsyncStorage.setItem('UserData', JSON.stringify(theUser));
    } catch (error) {
      console.log(error);
    }
  }

  const calIntake = [
    Math.random() * 1000 + 1700,
    Math.random() * 1000 + 1700,
    Math.random() * 1000 + 1700,
    Math.random() * 1000 + 1700,
    Math.random() * 1000 + 1700,
    Math.random() * 1000 + 1700,
    Math.random() * 1000 + 1700
  ];

  return (
    <View style={styles.container}>
      <Image
        style={styles.profilePic}
        source={require('../../images/profilepic.jpg')}
      />
      <Text style={styles.name}>
        {name}
      </Text>
      <Text style={styles.email}>
        {email}
      </Text>
      <Text style={styles.genderAndAge}>
        {gender}, {age} y/o
      </Text>
      <Text style={styles.graphTitle}>
        Calorie Intake Last 7 Days
      </Text>
      <CustomButton
        style={styles.logOutButton}
        title='Log Out'
        onPress={logout}
      />
      <CustomButton
        style={styles.changePasswordButton}
        textStyle={styles.changePasswordText}
        title='Change Password'
        onPress={showDialog}
      />

      <Dialog.Container visible={visible}>
        <Dialog.Title>Change Password</Dialog.Title>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setOldPassword(value)}
          value={oldPassword}
          placeholder="Current Password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setNewPassword(value)}
          value={newPassword}
          placeholder="New Password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setConfirmPassword(value)}
          value={confirmPassword}
          placeholder="Confirm New Password"
          secureTextEntry={true}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Change Password" onPress={handleChange} />
      </Dialog.Container>

      <LineChart
        data={{
          labels: ["Day -8", "Day -7", "Day -6", "Day -5", "Day -4", "Day -3", "Yesterday"],
          datasets: [
            {
              data: calIntake
            }
          ]
        }}
        width={Dimensions.get("window").width * 95 / 100} // from react-native
        height={Dimensions.get("window").height / 2}
        yAxisSuffix="cal"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 5,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      /></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f1ee',
  },
  profilePic: {
    position: 'absolute',
    borderRadius: 100,
    top: '3%',
    left: '7%',
  },
  name: {
    position: 'absolute',
    fontSize: 25,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#4287f5',
    top: '3%',
    left: '35%',
  },
  email: {
    position: 'absolute',
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#666b73',
    top: '9%',
    left: '35%',
  },
  genderAndAge: {
    position: 'absolute',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#2ac41f',
    top: '14%',
    left: '35%',
  },
  graphTitle: {
    position: 'absolute',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#e26a00',
    bottom: '15%',
  },
  logOutButton: {
    position: 'absolute',
    bottom: '1%',
    width: '28%',
    height: '12%',
    left: '15%',
    backgroundColor: '#ff7da0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePasswordButton: {
    position: 'absolute',
    bottom: '1%',
    width: '28%',
    height: '12%',
    right: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePasswordText: {
    fontSize: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
  },
});