import {TextareaAutosize} from '@material-ui/core';
import {green} from '@material-ui/core/colors';
import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Image,
  TouchableOpacity,
  Text,
  Label,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
// import {white} from 'react-native-paper/lib/typescript/styles/colors';

// const DATA = [
//   'Hoisin sauce',
//   'Rice Vinegar',
//   'Low-sodium soy sauce',
//   'Mirin',
//   'Zest and Juice of 1/2 a Lime',
//   'Garlic Powder',
// ];

const RecipeDetailsScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.foodName}> Salmon </Text>
        <Image
          style={styles.image}
          source={require('../../images/salmon.png')}
        />
        <Text style={styles.foodDetailsHeader}> About This Dish</Text>
        <Text style={styles.foodDetails}>
          This is delicous and healthy. It may also benefit weight control.
        </Text>

        <Text style={styles.foodDetailsHeader}> Ingredients</Text>
        <Text style={styles.foodDetails}> - Hoisin sauce </Text>
        <Text style={styles.foodDetails}> - Low-sodium soy sauce</Text>
        <Text style={styles.foodDetails}> - Hoisin sauce </Text>
        <Text style={styles.foodDetails}> - Mirin</Text>
        <Text style={styles.foodDetails}> - Zest and Juice of 1/2 a Lime</Text>
        <Text style={styles.foodDetails}> - Garlic Powder</Text>
      </View>
    );
}

export default RecipeDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFEFE3',
  },
  foodName: {
    textAlign: 'center',
    position: 'absolute',
    width: '95%',
    height: 45,
    borderRadius: 20,
    backgroundColor: '#7E8E7D',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    top: '1%',
  },
  image: {
    top: '4%',
    marginBottom: 10,
    height: 150,
    width: 250,
  },
  foodDetailsHeader: {
    borderRadius: 20,
    backgroundColor: '#7E8E7D',
    color: 'white',
    marginTop: 20,
    textAlign: 'left',
    width: '95%',
    height: 32,
    fontSize: 20,
  },
  foodDetails: {
    width: '89%',
    backgroundColor: 'white',
    fontSize: 16,
  },
  dropDownButton: {
    marginTop: 10,
    textAlign: 'left',
    width: '95%',
  },
});
