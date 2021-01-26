import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const IconAOTHeader = require('../assets/logo-aot-w.png');

export class Header extends Component {
    render() {
        return (
                <View style={styles.header}>
                    <Image source={IconAOTHeader} style={styles.icon}></Image>
                    <Text style={styles.head}>FZ Smart Que</Text>
                    <Text style={styles.p}>By AIRPORTS OF THAILAND PLC. (v.1.0.0)</Text>
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
    icon: {
        width: 60,
        height: 30,
        resizeMode: 'contain',
        marginBottom: '2.5%',
    },
    head: {
        fontSize: 40,
        fontFamily: 'kanit-regular',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
    },
    h1: {
        fontSize: 40,
        fontFamily: 'kanit-semibold',
        color: '#fff'
    },
    p: {
        fontSize: 10,
        fontFamily: 'kanit-regular',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
    }
});
