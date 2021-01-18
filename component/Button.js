import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native'

import { useNavigation } from '@react-navigation/native';

export class Button extends Component {
    render() {
        const { navigation, color, circle, text, page } = this.props;

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate(page)}
                style={[styles.btn, styles.btnBlue]}>
                <Text style={styles.btnText}>{circle}</Text>
                <Text style={[styles.btnText, {fontFamily:'kanit-medium'}]}>{text}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        borderRadius:100,
        textAlign: 'center',
        overflow: 'hidden',
        padding: 20
    },
    btnBlue: {
        backgroundColor: '#60C5EA'
    },
    btnText: {
        fontSize: 20,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 2, height: 1},
        textShadowRadius: 1
    }
});
