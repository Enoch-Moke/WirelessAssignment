import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { CustomLabel } from '../../utilities/CustomLabel';

let config = require('../../Config');

const actions = [{
    text: 'Delete',
    color: '#8AB594',
    icon: require('../../images/delete.png'),
    name: 'delete',
    position: 1
}];

export default function ViewDetails({ navigation, route }) {

    const { email, id, date, headerTitle } = route.params;
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        getDetails();
    }, [])

    const getDetails = () => {
        console.log("Email: " + email + " id: " + id + " date: " + date);
        let url = config.settings.serverPath + '/api/meals/' + email + "/" + id;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    Alert.alert('Error in fetching meal', response.status.toString());
                    throw Error('Error in fetching meal: ' + response.status);
                }
                return response.json()
            })
            .then((mealData) => {
                setMeal(mealData);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const deleteMeal = () => {
        Alert.alert(
            'Confirm Delete Meal',
            'Are you sure you want to delete `' + meal.meal_name + '`?',
            [
                {
                    text: 'No',
                    onPress: () => { },
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        let url = config.settings.serverPath + '/api/meals/' + id;
                        fetch(url, {
                            method: 'DELETE',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                meal_id: id,
                            }),
                        })
                            .then(response => {
                                if (!response.ok) {
                                    Alert.alert('Error in deleting ', response.status.toString());
                                    throw Error('Error in deleting: ' + response.status);
                                }

                                return response.json();
                            })
                            .then(responseJson => {
                                if (responseJson.affected > 0) {
                                    navigation.goBack();
                                } else {
                                    Alert.alert('Error in deleting the meal');
                                }
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    },
                },
            ],
            { cancelable: false },
        );
    }

    return (
        <View style={styles.container}>
            <CustomLabel
                style1={styles.title}
                title1={"Food"}
                title2={meal ? meal.meal_name : ''}
            />
            <CustomLabel
                style1={styles.title}
                title1={"Calories"}
                title2={meal ? meal.meal_cal + " kcal" : ''}
            />
            <CustomLabel
                style1={styles.title}
                title1={"Record Date"}
                title2={date}
            />
            <FloatingAction
                actions={actions}
                overrideWithAction={true}
                color={'#8AB594'}
                onPressItem={() => { deleteMeal(); }}
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
    title: {
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#000000',
    },
});