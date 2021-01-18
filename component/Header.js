import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export class Header extends Component {
    render() {
        return (
            <View style={styles.header}> 
                <Text style={styles.h1}>AOT FREE ZONE</Text>
                <Text style={styles.p}>Smart Queue</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        // flex: 1,
        height: '25%',
        flexDirection: 'column',
        backgroundColor: '#60C5EA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 40,
        fontFamily: 'kanit-semibold',
        color: '#fff'
    },
    p: {
        fontSize: 30,
        fontFamily: 'kanit-semibold',
        color: '#fff'
    }
});
