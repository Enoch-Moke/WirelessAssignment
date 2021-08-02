import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';

export default class PlanDetails extends Component<Props>  {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>5-DAY PLAN</Text>
                <Text style={{ color: 'blue', fontWeight: 'bold', margin: 10 }}>ATKINS DIET</Text>

                <View style={styles.dayContainer}>
                    <Text style={{ color: 'green', fontWeight: 'bold', margin: 10, marginBottom: 0 }}>DAY 1</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Breakfast: Scramble Egg</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Lunch: Grill Chicken + Salad</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Dinner: Fried Chicken</Text>
                </View>

                <View style={styles.dayEvenContainer}>
                    <Text style={{ color: 'green', fontWeight: 'bold', margin: 10, marginBottom: 0 }}>DAY 2</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Breakfast: Scramble Egg</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Lunch: Grill Lamb + Salad</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Dinner: Fried Chicken with sauce</Text>
                    <Image
                        source={require('../../images/scramble.png')}
                        style={styles.image}
                    />
                </View>

                <View style={styles.dayContainer}>
                    <Text style={{ color: 'green', fontWeight: 'bold', margin: 10, marginBottom: 0 }}>DAY 3</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Breakfast: Scramble Egg</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Lunch: Fried Chicken</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Dinner: Soup</Text>
                </View>

                <View style={styles.dayEvenContainer}>
                    <Text style={{ color: 'green', fontWeight: 'bold', margin: 10, marginBottom: 0 }}>DAY 4</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Breakfast: Lemon + Sausages</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Lunch: Grill Salmon</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Dinner: Soup</Text>
                    <Image
                        source={require('../../images/salmon.png')}
                        style={styles.image}
                    />
                </View>

                <View style={styles.dayContainer}>
                    <Text style={{ color: 'green', fontWeight: 'bold', margin: 10, marginBottom: 0 }}>DAY 5</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Breakfast: Scramble Egg</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Lunch: Chicken + Salad</Text>
                    <Text style={{ color: 'black', margin: 10, marginBottom: -10 }}>Dinner: Fried Lamb</Text>

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
        justifyContent: 'center',
    },

    text: {
        fontSize: 20,
        alignItems: 'center',
        margin: 10,
        color: '#07006b',
        marginBottom: 0,
        marginTop: 20,
        fontWeight: 'bold',
    },

    dayContainer: {
        backgroundColor: '#cffadb',
        width: '100%',
        height: 100,
    },

    dayEvenContainer: {
        backgroundColor: '#Ffffff',
        width: '100%',
        height: 100,
    },

    planContainer: {
        height: '40%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    image: {
        width: '33.333333%',
        height: '100%',
        position: 'absolute',
        right: 12,
        top: 2,
        resizeMode: 'contain',
    }

});
