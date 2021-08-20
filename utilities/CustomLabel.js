import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

class CustomLabel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[labelStyles.labelContainer, this.props.labelContainer]}>
                {/* <View style={this.props.imageStyle1}>
                    <Image
                        source={{ uri: this.props.uri1 ? this.props.uri1 : '' }}
                        style={{ width: this.props.width1 ? this.props.width1 : '', height: this.props.height1 ? this.props.height1 : '' }}
                    />
                </View> */}
                <Text style={[labelStyles.title1, this.props.style1]}>
                    {this.props.title1 ? this.props.title1 : ''}
                </Text>
                <Text style={labelStyles.title2}>
                    {this.props.title2 ? this.props.title2 : ''}
                </Text>
                <Text style={labelStyles.title3}>
                    {this.props.title3 ? this.props.title3 : ''}
                </Text>
                {/* <View style={this.props.imageStyle2}>
                    <Image
                        source={{ uri: this.props.uri2 ? this.props.uri2 : '' }}
                        style={{ width: this.props.width2 ? this.props.width2 : '', height: this.props.height2 ? this.props.height2 : '' }}
                    />
                </View> */}
            </View>
        )
    }
}

const labelStyles = StyleSheet.create({
    labelContainer: {
        paddingBottom: 15,
        marginTop: 10,
        marginLeft: 40,
        // borderBottomWidth: 1,
        // borderColor: '#ccc',
    },
    title1: {
        fontSize: 22,
        fontWeight: '900',
        color: '#000000',
        marginBottom: 10,
    },
    title2: {
        fontSize: 18,
        color: '#000000',
    },
    title3: {
        fontSize: 18,
        color: '#000000',
    },

});

module.exports = {
    CustomLabel: CustomLabel,
}