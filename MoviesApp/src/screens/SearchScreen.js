import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image, Dimensions, TextInput, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { XCircleIcon } from 'react-native-heroicons/outline'
import { styles, theme } from '../theme'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { debounce } from 'lodash'
import { fallbackMoviePoster, searchMovies, w500 } from '../api/db'


const { width, height } = Dimensions.get('window');
export default function SearchScreen() {

    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = (value) => {
        if (value.length > 3) {

            setLoading(true);
            searchMovies({
                query: value,
                include_adult: false,
                language: 'en-US',
                page: 1
            }).then(data => {
                setResults(data.results);
                console.log(data.results);
                setLoading(false);
            })

        }

    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
    console.log(results);

    return (
        <SafeAreaView className={`flex-1 bg-neutral-800 pt-20`}>
            <View className="flex-row justify-between mx-4 mb-3 items-center border border-neutral-300 rounded-full">

                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'white'}
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className="rounded-full p-3 m-1 bg-neutral-500"
                >
                    <XCircleIcon size={30} color={'white'} />
                </TouchableOpacity>

            </View>

            {
                loading ? (
                    <Loading />
                ) : (

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 15 }}
                        className="space-y-4"
                    >

                        <Text className="text-white font-semibold ml-1">
                            Results ({results.length})
                        </Text>

                        <View className="flex-row justify-between flex-wrap">
                            {results.length ? (
                                results.map((item, index) => {

                                    return <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => navigation.push('Movie', item)}
                                    >

                                        <View className="space-y-2 mb-4">
                                            <Image
                                                source={{ uri: w500(item?.poster_path || fallbackMoviePoster) }}
                                                style={{ width: width * 0.44, height: height * 0.3 }}
                                                className="rounded-3xl"
                                            />
                                            <Text className="text-neutral-400 ml-1 overflow-hidden ">
                                                {item?.original_title.length > 22 ? item?.original_title.slice(0, 22) : item?.original_title}
                                            </Text>
                                        </View>

                                    </TouchableWithoutFeedback>
                                })
                            ) : (
                                <View className="flex-1 justify-center items-center mt-20">
                                    <Image
                                        source={require('./../../assets/images/placeholder.png')}
                                        style={{ width: width * 0.5, height: height * 0.2 }}
                                    />
                                </View>
                            )}
                        </View>

                    </ScrollView>
                )
            }

        </SafeAreaView>
    )
}