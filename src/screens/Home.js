import React, { useState, useEffect } from 'react'
import { TouchableOpacity, FlatList } from 'react-native'
import { Div as View, Text, Icon } from 'react-native-magnus'
import { rv, hp } from '../helpers/responsive'
import { Loading } from '../components'
import useFetch from '../hooks/useFetch'

const Home = ({ navigation }) => {

    const [Indicators, setIndicators] = useState({})
    const { response, loading } = useFetch({ method: 'GET', url: '/api' });
    useEffect(() => {
        if (response != null) {
            const List = Object.entries(response).map(([key, value]) => {
                return value
            })
            const newData = List.filter(x => x.codigo != undefined)
            setIndicators(newData)
        }
    }, [response]);

    const _RenderItem = ({ item, index }) => {
        return (
            <View key={index}>
                <View row={true} alignItems='center' py={rv(hp(3))}>
                    <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.codigo, title: item.nombre, type: item.unidad_medida })} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View w={'85%'} ml={rv(hp(1.5))}>
                            <Text fontSize={rv(hp(2.8))} my={3} fontWeight='bold' color='blue700'>{item.nombre}</Text>
                            <Text fontSize={rv(hp(2.6))} my={3} fontWeight='400' >{item.unidad_medida}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Week', { id: item.codigo, title: item.nombre, item: item, type: item.unidad_medida })}>
                        <View row>
                            <Icon name='info' fontFamily='Feather' fontSize={rv(hp(4))} color='blue600' />
                            <Icon name='chevron-right' fontFamily='Feather' fontSize={rv(hp(4))} color='blue600' />
                        </View>
                    </TouchableOpacity>
                </View>
                <View h={1} bg='#ccc' />
            </View>
        )
    }

    return (loading ?
        <Loading />
        :
        <View flex={1} bg='white' px={rv(hp(3))}>
            <FlatList
                data={Indicators}
                keyExtractor={item => item.codigo}
                renderItem={(item, index) => _RenderItem(item, index)}
            />
        </View>
    )
}

export default Home
