import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
const ProfileScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: 'Profile',
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
            <Text>ProfileScreen</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})