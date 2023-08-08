import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
const SavedScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: 'Saved',
            headerTitleStyle: {
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
                marginLeft: '50%',
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
            <Text>SavedScreen</Text>
        </View>
    )
}

export default SavedScreen

const styles = StyleSheet.create({})