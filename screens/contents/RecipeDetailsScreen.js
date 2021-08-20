import {TextareaAutosize} from '@material-ui/core';
import {green} from '@material-ui/core/colors';
import React, {useState, useEffect, Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  FlatList,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';

let config = require('../../Config');

export default function RecipeDetailsScreen ({navigation, route}) {
    const { id, headerTitle } = route.params;
    const [fetching, setFetching] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [instruction, setInstruction] = useState([]);
    const [image, setImage] = useState([]);
    
    useEffect(() => {
        getIngredients();
        getImage();
        getInstruction();
    }, [])

    const getIngredients = () => {
        console.log("id: " + id);
        let url = config.settings.serverPath + '/api/recipes/' + id;
        setFetching(true);

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    Alert.alert('Error in fetching recipes details', response.status.toString());
                    throw Error('Error in fetching recipe details: ' + response.status);
                }
                return response.json()
            })
            .then((recipeData) => {
              setIngredients(recipeData);
              setFetching(false);
            })
            .catch((error) => {
              console.log(error)
            });
    }

    const getImage = () => {
        console.log("id: " + id);
        let url = config.settings.serverPath + '/api/recipeImage/' + id;
        setFetching(true);

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    Alert.alert('Error in fetching image', response.status.toString());
                    throw Error('Error in fetching image: ' + response.status);
                }
                return response.json()
            })
            .then((imageData) => {
              setImage(imageData);
              setFetching(false);
            })
            .catch((error) => {
              console.log(error)
            });
    }

    const getInstruction = () => {
        console.log("id: " + id);
        let url = config.settings.serverPath + '/api/instruction/' + id;
        setFetching(true);

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    Alert.alert('Error in fetching instruction', response.status.toString());
                    throw Error('Error in fetching instruction: ' + response.status);
                }
                return response.json()
            })
            .then((instructionData) => {
              setInstruction(instructionData);
              setFetching(false);
            })
            .catch((error) => {
              console.log(error)
            });
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <FlatList
              scrollEnabled={false}
              data={image}
              showsVerticalScrollIndicator={false}
              refreshing={fetching}
              renderItem={({ item }) => {

                return (
                  <View>
                    <Image source={{uri: item}}
                    style={styles.foodImage}
                    />
                  </View>
                )
              }}
            />
          </View>

          <Text style={styles.ingredientHeader}>Ingredients</Text>
        
          <View style={styles.ingredientList}>
            <FlatList
              scrollEnabled={false}
              data={ingredients}
              showsVerticalScrollIndicator={false}
              refreshing={fetching}
              renderItem={({ item }) => {

                return (
                  <View style={{marginBottom: 15}}>
                    <Text style={styles.ingredientText}> - {item.ingredient_name}</Text>
                  </View>
                )
              }}
              keyExtractor={(item) => { return item.ingredient_id.toString() }}
            />
          </View>

          <Text style={styles.procedureText}>Procedure</Text>

          <View style={styles.instructionList}>
            <FlatList
              scrollEnabled={false}
              data={instruction}
              showsVerticalScrollIndicator={false}
              refreshing={fetching}
              renderItem={({ item }) => {

                return (
                  <Text style={styles.instructionText}>
                    {item}
                  </Text>
                )
              }}
            />
          </View>

          <View>
            <Text></Text>
          </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFEFE3',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  foodImage: {
    height: 300,
    width: 350,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#ffffff',
  },
  ingredientHeader: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    width: 140,
    backgroundColor: '#f5f1ee',
    borderWidth: 3,
    borderRadius: 50,
    borderColor: '#9f6f39',
  },
  ingredientList: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    padding: 10,
    backgroundColor: '#f5f1ee',
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#9f6f39',
  },
  ingredientText: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '100',
  },
  procedureText: {
    marginLeft: 30,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#404040',
  },
  instructionList: {
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
  },
  instructionText: {
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'justify',
    color: '#404040',
  },
});
