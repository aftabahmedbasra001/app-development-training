import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon, } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/Cast'
import MovieList from '../components/MovieList'
import Loading from '../components/Loading'
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, w500 } from '../api/db'


const { width, height } = Dimensions.get('window');
const MovieScreen = () => {

    const navigation = useNavigation();
    const { params: item } = useRoute();

    const name = movie?.name;



    const [isFavourite, toggleFavourite] = useState(false);
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item]);


    const getMovieDetails = async (id) => {
        const data = await fetchMovieDetails(id);
        if (data) setMovie(data);
    }


    const getMovieCredits = async (id) => {
        const data = await fetchMovieCredits(id);
        if (data && data.cast) setCast(data.cast);
    }

    const getSimilarMovies = async (id) => {
        const data = await fetchSimilarMovies(id);
        if (data && data.results) {
            setSimilar(data.results);
            setLoading(false);
        }
    }


    return (

        loading ? (
            <Loading />
        ) : (
            <ScrollView
                contentContainerStyle={{ paddingBottom: 15 }}
                className="flex-1 bg-neutral-900 pt-8"
            >
                <View className="w-full">
                    <SafeAreaView className={`absolute z-20 w-full flex-row justify-between items-center px-4`}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            className="rounded-xl p-1" style={styles.background}>
                            <ChevronLeftIcon size={28} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                            <HeartIcon size={35} color={isFavourite ? theme.background : 'white'} />
                        </TouchableOpacity>
                    </SafeAreaView>

                    <View>
                        <Image
                            source={{ uri: w500(movie?.poster_path) }}
                            style={{ width, height: height * 0.55 }}
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(23,23,23, 0.8)', 'rgba(23,23,23, 1)']}
                            style={{ width, height: height * 0.40 }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className="absolute bottom-0"
                        />
                    </View>
                </View>


                <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                    <Text className="text-white text-center text-3xl font-bold tracking-wider">
                        {movie?.original_title}
                    </Text>

                    <Text className="text-neutral-400 font-semibold text-base text-center">{movie?.status} . {item.release_date.split('-')[0]} . {movie?.runtime} min</Text>
                    <View className="flex-row justify-center mx-4 space-x-2">
                        {
                            movie?.genres?.map((genre, index) => {
                                const showDot = index + 1 != movie.genres.length;
                                const dot = showDot ? '.' : null;
                                return (
                                    <Text key={index} className="text-neutral-400 font-semibold text-base text-center">{genre.name} {dot}</Text>
                                )
                            })
                        }
                    </View>

                    <Text className="text-neutral-400 mx-4 tracking-wide">
                        {item.overview}
                    </Text>
                </View>


                {/* Cast members */}
                <Cast cast={cast} />



                {/* Similar movies*/}
                <MovieList title="Similar Movies" movies={similar} hideSeeAll={true} />


            </ScrollView >
        )

    )
}

export default MovieScreen;