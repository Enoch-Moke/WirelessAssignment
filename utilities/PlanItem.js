import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
} from 'react-native';

export default class PlanItem extends Component<Props> {
    render() {
        return (
            <View style={styles.planItem}>
                <Image
                    source={this.props.planImage}
                    style={styles.image}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    planItem: {
        width: '100%',
        height: '100%',
        padding: 20,
    },

    image: {
        width: '100%',
        height: '100%',
        //opacity: 0.8,
        borderColor: '#050505',
        borderWidth: 3
    }
})
