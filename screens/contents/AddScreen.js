import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Alert,
  TouchableHighlight,
} from 'react-native';
import { CustomLabel } from '../../utilities/CustomLabel';

let config = require('../../Config');

export default function Add({ navigation, route }) {

  const { email } = route.params;
  const [mealsList, setMealsList] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch('https://mocki.io/v1/a61cc719-592e-4be8-8246-fd9f031d4f50')
      .then((response) => response.json())
      .then((responseJson) => {
        setMealsList(responseJson);
        setSearchResults(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchMeals = (input) => {
    if (input) {
      const newData = mealsList.filter(
        function (item) {
          const itemData = item.name? item.name.toUpperCase(): ''.toUpperCase();
          const textData = input.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setSearchResults(newData);
      setSearch(input);
    } else {
      setSearchResults(mealsList);
      setSearch(input);
    }
  };

  const addMeal = ({ item, email }) => {

    console.log("Email: " + email);
    console.log("Meal: " + item.name);
    console.log("Calories: " + item.calories);

    Alert.alert(
      'Confirm Add Meal',
      'Are you sure you want to add `' + item.name + '`?',
      [
        {
          text: 'No',
          onPress: () => { },
        },
        {
          text: 'Yes',
          onPress: () => {
            var todayDate = new Date();
            todayDate = todayDate.getTime();
            console.log("Date" + todayDate);

            let url = config.settings.serverPath + '/api/meals/' + email;

            fetch(url, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_email: email,
                meal_name: item.name,
                meal_cal: item.calories,
                record_date: todayDate,
              }),
            }).then((response) => {
              if (!response.ok) {
                Alert.alert('Error in adding meal ', response.status.toString());
                throw Error('Error in adding meal: ' + response.status);
              }
              return response.json()

            }).then((responseJson) => {
              if (responseJson.affected > 0) {
                Alert.alert('Meal Added', '`' + item.name + '` has been added into Meal Log');
              }
              else {
                console.log('respond')
                console.log(responseJson.affected);
                Alert.alert('Error in adding meal');
              }

              navigation.navigate({
                name: 'My Meal Log',
              });
            })
              .catch((error) => {
                console.error(error);
              });
          }
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          underlineColorAndroid="transparent"
          placeholder="Search Meal..."
          value={search}
          onChangeText={(input) => searchMeals(input)}
        />
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return(
              <View style={styles.itemContainer}>
                <TouchableHighlight
                  style={styles.mealItem}
                  underlayColor={'#cccccc'}
                  onPress={() => {
                    setMeal(item);
                    addMeal({ item, email });
                  }}
                >
                  <CustomLabel
                    title2={item.name.toUpperCase()}
                    title3={item.calories + " kcal"}
                  />
                </TouchableHighlight>
              </View>
            );
            }}
          ListEmptyComponent={({ item }) => {
            return (
              <Text
                style={styles.noDataMsg}>
                No Meal Found.
              </Text>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f1ee',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  mealItem: {
    flex: 1,
  },
  searchBar: {
    height: 50,
    paddingLeft: 40,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  noDataMsg: {
    paddingTop: 40,
    margin: 10,
    fontSize: 16,
    textAlign: 'center',
  }
});