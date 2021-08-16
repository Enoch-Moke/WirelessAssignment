import React, { useState, useEffect, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  FlatList,
  SafeAreaView,
  LogBox,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FloatingAction } from 'react-native-floating-action';
LogBox.ignoreAllLogs();
let config = require('../../Config');

const actions = [{
  text: 'Add',
  icon: require('../../images/add.png'),
  name: 'add',
  position: 1
}];

export default function ViewLog({ navigation, route }) {

  const { email } = route.params;
  const [fetching, setFetching] = useState(false);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    return unsubscribe;
  }, []);

  const getData = () => {
    let url = config.settings.serverPath + '/api/meals/' + email;
    setFetching(true);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          Alert.alert('Error in fetching meals', response.status.toString());
          throw Error('Error in fetching meals: ' + response.status);
        }
        return response.json()
      })
      .then((mealsData) => {
          setMeals(mealsData);
          setFetching(false);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <View style={styles.container} >
      <FlatList
        data={meals}
        showsVerticalScrollIndicator={true}
        refreshing={fetching}
        renderItem={({ item }) => {
          var dateDay = new Date(item.record_date).getDate();
          var day = new Date(item.record_date).getDay();
          var month = new Date(item.record_date).getMonth();
          var year = new Date(item.record_date).getFullYear();
          
          var daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturday'];
          var monthsArray = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
          var dayText = daysArray[day];
          var monthText = monthsArray[month];
          var newdate = dayText + ', ' + dateDay + ' ' + monthText + ', ' + year;

          return (<TouchableHighlight
            underlayColor={'#cccccc'}
            onPress={() => {
              navigation.navigate('View Details', {
                email: email,
                id: item.meal_id,
                date: newdate,
                headerTitle: item.meal_name,
              })
            }}
          >
            <View style={styles.mealList}>
              <Text style={styles.mealTitle}>{item.meal_name}</Text>
              <Text style={styles.mealInfo}>{item.meal_cal} kcal</Text>
              <Text style={styles.mealInfo}>- {newdate}</Text>
            </View>
          </TouchableHighlight>);
        }}
        ListEmptyComponent={({ item }) => {
          return (
            <Text
              style={styles.noDataMsg}>
              No Meal Record.
            </Text>
          );
        }}
        keyExtractor={(item) => { item.meal_id.toString() }}
      />
      <FloatingAction
        actions={actions}
        overrideWithAction={true}
        color={'#8AB594'}
        onPressItem={() => { navigation.navigate('Add Meal', { email: email }) }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#DFEFE3',
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  mealList: {
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 40,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  mealTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: '#000000',
  },
  mealInfo: {
    fontSize: 18,
  },
  noDataMsg: {
    paddingTop: 40,
    margin: 10,
    fontSize: 16,
    textAlign: 'center',
  }
});