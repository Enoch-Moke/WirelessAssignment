import { blue } from '@material-ui/core/colors';
import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";
import { CustomButton } from '../../utilities/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ navigation, route }) {
  const logout = async () => {
    try {
        await AsyncStorage.removeItem('UserData');
        navigation.navigate('Auth');
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
        Chuah Hein Teik
      </Text>    
      <Text style={styles.joinedDate}>
        Joined 1 April 2008
      </Text> 
      <Text style={styles.genderAndAge}>
        Male, 60 y/o
      </Text> 
      <Text style={styles.graphTitle}>
        Calorie Intake Last 7 Days
      </Text>
      <CustomButton
        style={styles.button}
        title='Log Out'
        onPress={logout}
      /> 

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
  joinedDate: {
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
    bottom:'14%',
  },  
  button: {
    position:'absolute',
    bottom:'10%',
    margin: -50,
  },
});