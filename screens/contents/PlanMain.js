import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import PlanItem from '../../utilities/PlanItem';

export default class PlanMain extends Component<Props>  {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>PLANS</Text>

        <Text style={{ fontSize: 15, marginBottom: 20, color: '#124f22' }}>Nine most popular diets rated by experts 2017</Text>

        <View style={styles.planContainer}>
          <TouchableOpacity style={styles.image}
            onPress={() => this.props.navigation.navigate('Plan Details')}>
            <PlanItem planImage={require('../../images/atkins_diet.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.image}>
            <PlanItem planImage={require('../../images/zone_diet.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.image}>
            <PlanItem planImage={require('../../images/Low-carb-diet.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.image}>
            <PlanItem planImage={require('../../images/Ketogenic-Diet.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.image}>
            <PlanItem planImage={require('../../images/paleo_diet.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.image}>
            <PlanItem planImage={require('../../images/vegan_diet.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.image}>
            <PlanItem planImage={require('../../images/weight_watchers_diet.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.image}>
            <PlanItem planImage={require('../../images/raw_food_diet.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.image}>
            <PlanItem planImage={require('../../images/mediterranean_diet.png')} />
          </TouchableOpacity>

        </View>

      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFEFE3',
    alignItems: 'center',
    //justifyContent: 'center',
  },

  text: {
    fontSize: 30,
    alignItems: 'center',
    margin: 10,
    color: '#050505',
    marginBottom: 10,
    marginTop: 40,
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

  }

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
