import React, { useState, useEffect, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';

//import PlanItem from '../../utilities/PlanItem';
//import AsyncStorage from '@react-native-async-storage/async-storage';

let config = require('../../Config');

export default function PlanMain ({ navigation, route })  {
  
  //const { email } = route.params;
  const [fetching, setFetching] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    let url = config.settings.serverPath + '/api/plans';
    setFetching(true);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          Alert.alert('Error in fetching plans', response.status.toString());
          throw Error('Error in fetching plans: ' + response.status);
        }
        return response.json()
      })
      .then((plansData) => {
          setPlans(plansData);
          setFetching(false);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <View style={styles.container} >
      <Text style={{ margin: 10, fontSize: 15, marginBottom: 20, color: '#124f22' }}>Nine most popular diets rated by experts 2017</Text>
      <FlatList
        data={plans}
        showsVerticalScrollIndicator={true}
        refreshing={fetching}
        renderItem={({ item }) => {

          return (<TouchableHighlight
            underlayColor={'#cccccc'}
            onPress={() => {
              navigation.navigate('Plan Details', {
                id: item.plan_id,
                headerTitle: item.plan_name,
                // refresh: this._query,
              })
            }}
          >
            <View style={styles.planList}>
              <Image source={{uri: item.plan_name_photo}}
                style={{width: 100,height: 100}}/>
              <Text style={styles.planTitle}>{item.plan_name}</Text>
            </View>
          </TouchableHighlight>);
        }}
        keyExtractor={(item) => { item.plan_id.toString() }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: '#DFEFE3',
    paddingTop: 20,
  },

  text: {
    fontSize: 30,
    alignItems: 'center',
    margin: 10,
    color: '#050505',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },

  planContainer: {
    height: '40%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  image: {
    width: '33.333333%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  planList: {
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 40,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  planTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#07006b',
    marginTop: 10,
    fontWeight: 'bold',
  },

});

//Atkins diet
//The zone diet
//low-carb diets 
//ketogenic diet
//the paleo diet 
//vegetarian diet
//WW (Weight Watchers) 
// raw food diet
// mediterranean diet 
