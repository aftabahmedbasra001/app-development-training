import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../theme'
import MovieList from '../components/MovieList'
import { useNavigation, useRoute } from '@react-navigation/native'
import { fallbackPersonPoster, fetchPersonDetails, fetchPersonMovies, w185 } from '../api/db'


const { width, height } = Dimensions.get('window');
export default function PersonScreen() {

    const navigation = useNavigation();
    const { params: person } = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const [newPerson, setNewPerson] = useState({});
    const [movies, setMovies] = useState([]);

    console.log(person)
    useEffect(() => {

        getPersonDetails(person.id);
        getPersonMovies(person.id);

    }, person);

    const getPersonDetails = async (id) => {
        const data = await fetchPersonDetails(id);
        console.log(data);
        if (data) {
            setNewPerson(data);
        }
    }

    const getPersonMovies = async (id) => {
        const data = await fetchPersonMovies(id);
        if (data) {
            setMovies(data.cast);
        }
    }


    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 15 }}
            className="flex-1 bg-neutral-900 pt-8"
        >
            <View className="w-full">
                <SafeAreaView className={`w-full flex-row justify-between items-center px-4`}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="rounded-xl p-1" style={styles.background}>
                        <ChevronLeftIcon size={28} color='white' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size={35} color={isFavourite ? 'red' : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>

                <View
                    className="flex-row justify-center"
                    style={{
                        shadowColor: 'white',
                        shadowRadius: 40,
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 1
                    }}>
                    <View className="items-center rounded-full overflow-hidden w-72 h-72 border-2 border-neutral-400">
                        <Image
                            source={{ uri: w185(newPerson?.profile_path) || fallbackPersonPoster }}
                            style={{ height: height * 0.43, width: width * 0.74 }}
                        />
                    </View>

                </View>

                <View className="mt-6">
                    <Text className="text-white text-3xl text-center font-bold">
                        {newPerson?.name}
                    </Text>

                    <Text className="text-base text-neutral-500 text-center">
                        {newPerson?.place_of_birth}
                    </Text>
                </View>

                <View className="flex-row justify-center mx-3 mt-6 p-4 items-center bg-neutral-700 rounded-full">

                    <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">Gender</Text>
                        <Text className="text-neutral-300 text-sm">
                            {newPerson?.gender == 1 ? 'Female' : 'Male'}
                        </Text>
                    </View>
                    <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">Birthday</Text>
                        <Text className="text-neutral-300 text-sm">{newPerson?.birthday}</Text>
                    </View>
                    <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">Known For</Text>
                        <Text className="text-neutral-300 text-sm">{newPerson?.known_for_department}</Text>
                    </View>
                    <View className="border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">Popularity</Text>
                        <Text className="text-neutral-300 text-sm">{newPerson?.popularity?.toFixed(2)}</Text>
                    </View>

                </View>

                {/* Person Biography */}
                <View className="my-6 mx-4 space-y-2">
                    <Text className="text-white text-lg">Biography</Text>
                    <Text className="text-neutral-300 tracking-wide">
                        {newPerson?.biography?.length > 1000 ? newPerson?.biography?.slice(0, 1000) + '...' : newPerson?.biography}
                    </Text>
                </View>

                {/* Person movies */}
                <MovieList title="Movies List" movies={movies} hideSeeAll={true} />

            </View>
        </ScrollView>
    )
}