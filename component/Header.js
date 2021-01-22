import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export class Header extends Component {
    render() {
        return (
                <View style={styles.header}>
                    <Text style={styles.head}>FZ Smart Que</Text>
                    <Text style={styles.p}>By AIRPORTS OF THAILAND PLC.</Text>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        // flex: 1,
        height: '27%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head: {
        fontSize: 40,
        fontFamily: 'kanit-regular',
        color: '#fff'
    },
    h1: {
        fontSize: 40,
        fontFamily: 'kanit-semibold',
        color: '#fff'
    },
    p: {
        fontSize: 10,
        fontFamily: 'kanit-regular',
        color: '#fff'
    }
});
