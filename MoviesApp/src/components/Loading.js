import { View, Text, Dimensions } from 'react-native'
import * as Progres from 'react-native-progress'
import React from 'react'
import { theme } from '../theme';


const { width, height } = Dimensions.get('window');
export default function Loading() {
    return (
        <View style={{ height, width }} className="absolute flex-row justify-center items-center">
            <Progres.CircleSnail thickness={12} size={160} color={theme.background} />
        </View>
    )
}