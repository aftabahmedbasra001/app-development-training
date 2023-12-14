import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { fallbackPersonPoster, w185 } from '../api/db';

function Cast({ cast }) {

    const navigation = useNavigation();

    return (
        <View className="my-6">
            <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >

                {cast && cast.map((person, index) => {

                    const characterName = person?.character
                    const personName = person?.original_name

                    return <TouchableOpacity
                        onPress={() => navigation.navigate('Person', person)}
                        key={index} className="mr-4 items-center">
                        <View className="overflow-hidden items-center w-20 h-20 rounded-full border border-neutral-400">
                            <Image
                                source={{ uri: w185(person?.profile_path) || fallbackPersonPoster }}
                                className="rounded-2xl w-24 h-20"
                            />
                        </View>

                        <Text className="text-xs text-white mt-1">
                            {characterName.length > 10 ? characterName.slice(0, 10) : characterName}
                        </Text>
                        <Text className="text-xs text-neutral-400 mt-1">
                            {personName.length > 10 ? personName.slice(0, 10) : personName}
                        </Text>
                    </TouchableOpacity>
                })}

            </ScrollView>

        </View>
    )
}

export default Cast