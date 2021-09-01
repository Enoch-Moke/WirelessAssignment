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

export default function Profile({ navigation, route }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const [oldPassword, onChangeOldPassword] = React.useState(null);
  const [newPassword, onChangeNewPassword] = React.useState(null);
  const [confirmPassword, onChangeConfirmPassword] = React.useState(null);

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
  if(oldPassword != password){
    Alert.alert(
      "Error! Old Passwords do not match.",
      "",
      [{ text: "OK", onPress: () => console.log("OK Pressed")}]
    );
  }
  else if(newPassword != confirmPassword){
    Alert.alert(
      "Error! New Passwords do not match.",
      "",
      [{ text: "OK", onPress: () => console.log("OK Pressed")}]
    );
  }
  else{
    Alert.alert(
    "Password Successfully Changed",
    "Log Out and Log In again to use new password.",
    [{ text: "OK", onPress: () => console.log("OK Pressed")}]
    );
    //Function to update password in DB as {newPassword} 
    setVisible(false);
  }
};

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
        title='Change Password'
        onPress={showDialog}
      /> 

      <Dialog.Container visible={visible}>
        <Dialog.Title>Change Password</Dialog.Title>
        <TextInput
          style={styles.input}
          onChangeText={onChangeOldPassword}
          value={oldPassword}
          placeholder="Current Password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNewPassword}
          value={newPassword}
          placeholder="New Password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeConfirmPassword}
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
        width={Dimensions.get("window").width*95/100} // from react-native
        height={Dimensions.get("window").height/2}
        yAxisSuffix="cal"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
    position:'absolute',
    borderRadius:100,
	  top: '3%',
    left: '7%',
  },
  name: {
    position:'absolute',
    fontSize: 25,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color:'#4287f5',
    top:'3%',
    left:'35%',
  },
  email: {
    position:'absolute',
    fontSize: 20,
    fontFamily: 'Roboto',
    color:'#666b73',
    top:'9%',
    left:'35%',
  },
  genderAndAge: {
    position:'absolute',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color:'#2ac41f',
    top:'14%',
    left:'35%',
  },
  graphTitle: {
    position:'absolute',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color:'#e26a00',
    bottom:'15%',
  },  
  logOutButton: {
    position:'absolute',
    bottom:'1%',
    width: '28%',
    height:'12%',
    left:'15%',
    backgroundColor:'#ff7da0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePasswordButton: {
    position:'absolute',
    bottom:'1%',
    width: '28%',
    height:'12%',
    right:'15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
  },
});