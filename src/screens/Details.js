import React, { useEffect, useState } from 'react'
import { TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import { Div as View, Text, Icon } from 'react-native-magnus'
import { rv, hp } from '../helpers/responsive'
import Axios from 'axios'
import moment from 'moment'
const Details = ({ navigation, route }) => {
    const id = route.params.title;
    const [Indicators, setIndicators] = useState({})
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        setLoading(true)
        const { data } = await Axios.get(`https://mindicador.cl/api/${id}`)
        setIndicators(data)
        setLoading(false)
    }
    useEffect(() => {
        navigation.setOptions({ title: id })
    }, [navigation])

    useEffect(() => {
        getData();
        return () => {
        }
    }, [])


    const _RenderItem = ({ item, index }) => {
        return (
            <View key={index}>
                <View row={true} alignItems='center' py={rv(hp(3))}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View w={'50%'}>
                            <Text color='blue700' fontWeight='bold' fontSize={rv(hp(2.8))}>{moment(item.fecha).format('DD/MM/YYYY')}</Text>
                        </View>
                        <View w={'50%'} ml={rv(hp(1.5))} row alignItems='center'>
                            <Icon name='coin' fontSize={rv(hp(4))} color='black' fontFamily='Feather' />
                            <Text ml={rv(hp(2))} fontSize={rv(hp(2.7))}>{item.valor}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    return (
        <View flex={1} bg='white' px={rv(hp(3))}>
            {
                loading ?
                    <View flex={1} justifyContent='center' alignItems='center'>
                        <Text>Cargando datos...</Text>
                        <ActivityIndicator color='blue' size='large' />
                    </View> :
                    <FlatList
                        data={Indicators.serie}
                        keyExtractor={item => String(item.fecha)}
                        renderItem={(item, index) => _RenderItem(item, index)}
                    />
            }
        </View>
    )
}

export default Details
