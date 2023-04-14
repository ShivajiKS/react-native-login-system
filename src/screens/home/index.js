import { View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AnimeList from './animeList';
const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [animes, setAnimes] = useState([]);
    const onChangeSearch = (query) => {
        setSearchQuery(query);
        getAnimesonQuery()
    }
    const getAnimesonQuery = async () => {
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=40`)
        const resData = await res.json()
        setAnimes(resData.data)
    }
    useEffect(() => {
        getAnimesonQuery()
    }, [], animes)
    return (
        <View>
            <View className="w-[96vw] h-12 bg-gray-300 flex-row mt-14 mx-2 items-center rounded-md">
                <TextInput placeholder="Search..."
                    placeholderTextColor="red"
                    className="w-[85vw] text-lg text-red-600 font-semibold text-justify ml-2"
                    onChangeText={onChangeSearch}
                    value={searchQuery} />
                <TouchableOpacity className="ml-1" onPress={getAnimesonQuery}>
                    <MaterialIcons name="search" color={"red"} size={25} />
                </TouchableOpacity>
            </View>
            <View className="m-2 bg-slate-100">
                <AnimeList animes={animes} />
            </View>
        </View>
    )
}
export default Home