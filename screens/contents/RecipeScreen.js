import React, { useState, useRef, Component} from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');

const CAROUSELIMAGES = {
  image1: require('../../images/salad.jpg'),
  image2: require('../../images/wild-mushroom-risotto.jpg'),
  image3: require('../../images/salad.jpg'),
  image4: require('../../images/wild-mushroom-risotto.jpg')
};

const App = () => {
  const [images, setImages] = useState([
    { id: '1', image: CAROUSELIMAGES.image1 },
    { id: '2', image: CAROUSELIMAGES.image2 },
    { id: '3', image: CAROUSELIMAGES.image3 },
    { id: '4', image: CAROUSELIMAGES.image4 }
  ]);

  const [indexSelected, setIndexSelected] = useState(0);

  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(245, 241, 238, 1.0)'}}>
      {/* <ImageBackground source = {require('./img/background.jpg')} resizeMode="cover" style={{flex: 1}}> */}
        <ScrollView>
          <View style={{height: 300}}>
            <Carousel
              layout='default'
              data={images}
              sliderWidth={width}
              itemWidth={width}
              autoplay={true}
              loop={true}
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

          <View style={{padding: 10}}>
            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../../images/salad.jpg')}/>
              <Text style={styles.menuText}>
                Salad
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../../images/salad.jpg')}/>
              <Text style={styles.menuText}>
                Salad
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../../images/salad.jpg')}/>
              <Text style={styles.menuText}>
                Salad
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../../images/salad.jpg')}/>
              <Text style={styles.menuText}>
                Salad
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../../images/salad.jpg')}/>
              <Text style={styles.menuText}>
                Salad
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../../images/salad.jpg')}/>
              <Text style={styles.menuText}>
                Salad
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../../images/salad.jpg')}/>
              <Text style={styles.menuText}>
                Salad
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      {/* </ImageBackground> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFEFE3',
  },
  title: {
    fontSize: 48,
    textAlign: 'center',
    margin: 20,
    fontFamily: 'Roboto',
  },
  menuImage: {
    width: 50,
    height: 100,
    flex: 0.4,
  },
  menuText: {
    fontFamily: "Helvetica"
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
