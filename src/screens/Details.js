import React, { useEffect, useState } from 'react'
import { TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import { Div as View, Text, Icon } from 'react-native-magnus'
import { rv, hp } from '../helpers/responsive'
import useFetch from '../hooks/useFetch'
import { Loading } from '../components'
import moment from 'moment'
const Details = ({ navigation, route }) => {
    const tittle = route.params.title
    const { id, type } = route.params
    const [Indicators, setIndicators] = useState({})
    const { response, loading } = useFetch({ method: 'GET', url: `/api/${id}` });
    useEffect(() => {
        if (response != null) {
            setIndicators(response)
        }
    }, [response]);

    useEffect(() => {
        navigation.setOptions({ title: tittle })
    }, [navigation])


    const _RenderItem = ({ item, index }) => {
        return (
            <View key={index}>
                <View row={true} alignItems='center' py={rv(hp(3))}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View w={'50%'}>
                            <Text color='blue700' fontWeight='bold' fontSize={rv(hp(2.8))}>{moment(item.fecha).format('DD/MM/YYYY')}</Text>
                        </View>
                        <View w={'50%'} ml={rv(hp(1.5))} row alignItems='center'>
                            <Icon name={
                                type != 'Porcentaje' ? 'dollar-sign' : 'percent'
                            }
                                fontSize={rv(hp(4))} color={
                                    type != 'Porcentaje' ? 'green600' : 'blue600'
                                } fontFamily='Feather' />
                            <Text ml={rv(hp(2))} fontSize={rv(hp(3))}>{item.valor}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View h={1} bg='#ccc' />
            </View>
        )
    }

    return (loading ?
        <Loading
        /> :
        <View flex={1} bg='white' px={rv(hp(3))}>
            <FlatList
                data={Indicators.serie}
                keyExtractor={(item, index) => String(index)}
                renderItem={(item, index) => _RenderItem(item, index)}
            />
        </View>
    )
}

export default Details
