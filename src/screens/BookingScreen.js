import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
const BookingScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: 'Booking.com',
            headerTitleStyle: {
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
                marginLeft: '47%',
            },
            headerStyle: {
                backgroundColor: '#003580',
                height: 110,
                borderBottomColor: "transparent",
                shadowColor: "transparent",

            },

        })
    }, [])
    return (
        <View>
            <Text>BookingScreen</Text>
        </View>
    )
}

export default BookingScreen

const styles = StyleSheet.create({})