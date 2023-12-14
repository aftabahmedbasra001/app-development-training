import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { SafeAreaView, Text, View, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { fallbackMoviePoster, w500 } from '../api/db';


const { width, height } = Dimensions.get('window');
export const TrendingMovies = ({ data }) => {

    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
            <SafeAreaView classNam="flex-1 justify-center flex-row items-center">


                {/* Carousel for featured movies */}
                <Carousel
                    layout={"default"}
                    data={data}
                    inactiveSlideOpacity={0.6}
                    sliderWidth={width}
                    itemWidth={width * 0.6}
                    firstItem={2}
                    renderItem={({ item }) => <MovieCard item={item} />}
                    onSnapToItem={index => index} />
            </SafeAreaView>
        </View>
    )
}


const MovieCard = ({ item }) => {

    const navigation = useNavigation();

    return <TouchableWithoutFeedback onPress={() => navigation.navigate('Movie', item)} className="mx-5 justify-center items-center">
        <Image
            className="rounded-2xl"
            style={{ width: width * 0.6, height: height * 0.4 }}
            source={{ uri: w500(item.poster_path) || fallbackMoviePoster }} />

    </TouchableWithoutFeedback>
} 