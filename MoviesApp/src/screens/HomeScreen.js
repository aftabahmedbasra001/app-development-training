import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles } from '../theme'
import { TrendingMovies } from '../components/TrendingMovies'
import MovieList from '../components/MovieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/db'

const HomeScreen = () => {

    const navigation = useNavigation();

    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results) {
            setTrending(data.results);
        }
    }


    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results) {
            setUpcoming(data.results)
        }
    }


    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data.results) {
            setTopRated(data.results);
        }
        setLoading(false);
    }


    return (
        <View className="flex-1 bg-neutral-800 pt-6">
            <SafeAreaView>
                <StatusBar style="light" />

                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color={'white'} />
                    <Text className="text-white text-4xl font-bold">
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color={'white'} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading ? (
                    <Loading />
                ) : (

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingTop: 10 }} >

                        {/* trending movies */}
                        <TrendingMovies data={trending} />

                        {/* Upcoming movies */}
                        <MovieList title="Upcoming" movies={upcoming} />

                        {/* Upcoming movies */}
                        <MovieList title="Top Rated" movies={topRated} />

                    </ScrollView>
                )
            }


        </View>
    )
}

export default HomeScreen