import React, { useState, useEffect, Component} from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';

let config = require('../../Config');

const { width } = Dimensions.get('window');

export default function RecipeScreen ({ navigation, route }) {
  const [fetching, setFetching] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    let url = config.settings.serverPath + '/api/recipes';
    setFetching(true);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          Alert.alert('Error in fetching recipes', response.status.toString());
          throw Error('Error in fetching recipes: ' + response.status);
        }
        return response.json();
      })
      .then((recipesData) => {
        setRecipes(recipesData);
        setFetching(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  const [images, setImages] = useState([
    { id: '1', image: {uri: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/11/Fridge-raid-fried-rice-614b256.jpg?quality=90&webp=true&resize=300,272'} },
    { id: '2', image: {uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190418-skinny-alfredo-horizontal-1-1556224749.png?crop=0.650xw:0.974xh;0.148xw,0&resize=980:*'} },
    { id: '3', image: {uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-tuscan-butter-roast-chicken-still005-1549637202.jpg?crop=0.519xw:0.921xh;0.230xw,0.0634xh&resize=640:*'} },
    { id: '4', image: {uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/honey-walnut-shrimp-vertical-1548093886.png?crop=1xw:1xh;center,top&resize=980:*'} }
  ]);

  const [indexSelected, setIndexSelected] = useState(0);

  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f1ee'}}>
          <View style={{flex: 3}}>
            <Carousel
              layout='default'
              data={images}
              sliderWidth={width}
              itemWidth={width}
              autoplay={true}
              loop={true}
              useScrollView={false}
              renderItem={({ item, index }) => (
                <Image
                  key={index}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode='cover'
                  source={item.image}
                />
              )}
              onSnapToItem={index => onSelect(index)}
            />
            <Pagination
              inactiveDotColor='gray'
              dotColor={'rgba(163, 111, 53, 1.0)'}
              activeDotIndex={indexSelected}
              dotsLength={images.length}
              animatedDuration={150} 
              inactiveDotScale={1}
            />
          </View>

          <View style={{padding: 10, flex: 5}}>
            <FlatList
              scrollEnabled={true}
              data={recipes}
              showsVerticalScrollIndicator={true}
              refreshing={fetching}
              renderItem={({ item }) => {

                return (<TouchableHighlight
                  underlayColor={'#cccccc'}
                  onPress={() => {
                    navigation.navigate('Recipe Details', {
                      id: item.recipe_id,
                      headerTitle: item.recipe_name,
                      // refresh: this._query,
                    })
                  }}
                >
                  <View style={styles.menuItem}>
                    <Image source={{uri: item.recipe_photo}}
                      style={styles.menuImage}/>
                    <Text style={styles.menuText}>{item.recipe_name}</Text>
                  </View>
                </TouchableHighlight>);
              }}
              keyExtractor={(item) => { return item.recipe_id.toString() }}
            />
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    textAlign: 'center',
    margin: 20,
    fontFamily: 'Roboto',
  },
  menuImage: {
    width: 125,
    height: 100,
    resizeMode: 'cover',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  menuText: {
    fontFamily: "Helvetica",
    textAlignVertical: 'center',
    paddingLeft: 10,
  },
  menuItem: {
    flexDirection: "row",
    height: 100,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(202, 188, 79, 1.0)'
  }
});
