import React from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, w500 } from '../api/db';


const { width, height } = Dimensions.get('window');
function MovieList({ title, movies, hideSeeAll }) {

    const navigation = useNavigation();


    return (

        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
                {!hideSeeAll && <TouchableOpacity>
                    <Text className="text-lg" style={styles.text}>See All</Text>
                </TouchableOpacity>}
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >

                {movies.map((item, index) => {

                    const name = item.original_title;

                    return <TouchableWithoutFeedback
                        onPress={() => navigation.push('Movie', item)}
                        key={index}>
                        <View className="space-y-1 mr-4">
                            <Image
                                className="rounded-3xl"
                                style={{ width: width * 0.33, height: height * 0.22 }}
                                source={{ uri: w500(item.poster_path) || fallbackMoviePoster }} />
                            <Text className="text-neutral-300 ml-1">
                                {name.length > 18 ? name.slice(0, 18) + '...' : name}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                })}
            </ScrollView>
        </View>

    )
}

export default MovieList