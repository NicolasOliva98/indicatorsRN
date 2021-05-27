import React, { useEffect, useState } from 'react'
import { Div as View, Text, Icon } from 'react-native-magnus'
import { LineChart } from 'react-native-chart-kit'
import { rv, hp, wp } from '../helpers/responsive'
import moment from 'moment'
import { Loading } from '../components'
import useFetch from '../hooks/useFetch'

const WeekDetails = ({ navigation, route }) => {
    const tittle = route.params.title
    const { item, id, type } = route.params
    const { get } = useFetch()
    const [Indicators, setIndicators] = useState([])
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        setLoading(true)
        const { data } = await get(`https://mindicador.cl/api/${id}`)
        setIndicators(data.serie.reverse())
        setLoading(false)
    }

    useEffect(() => {
        navigation.setOptions({ title: tittle })
    }, [navigation])

    useEffect(() => {
        getData();
        return () => {
        }
    }, [])

    return (loading ?
        <Loading
        /> :
        <View flex={1} bg='white' px={rv(hp(3))}>
            <View
                mt={rv(hp(2))}
                bg='white'
                rounded='2xl'
                shadow='md'
            >
                <View my={rv(hp(2))} alignItems='center'>
                    <Text fontWeight='bold' fontSize={rv(hp(5))} color='blue700'>{`${item.unidad_medida === 'Porcentaje' ? '%' : '$'}${item.valor}`}</Text>
                </View>
                <View mx={20} my={rv(hp(2))} alignItems='center' row>
                    <Text fontWeight='600' fontSize={rv(hp(2.8))}>Nombre </Text>
                    <Text ml={rv(hp(3))} fontSize={rv(hp(2.4))}>{item.nombre}</Text>
                </View>
                <View mx={20} my={rv(hp(2))} alignItems='center' row>
                    <Text fontWeight='600' fontSize={rv(hp(2.8))}>Fecha</Text>
                    <Text ml={rv(hp(3))} fontSize={rv(hp(2.4))}> {moment(item.fecha).format('DD/MM/YYYY')}</Text>
                </View>
                <View mx={20} my={rv(hp(2))} alignItems='center' row>
                    <Text fontWeight='600' fontSize={rv(hp(2.8))}>Unidad de medida</Text>
                    <Text ml={rv(hp(3))} fontSize={rv(hp(2.4))}>{item.unidad_medida}</Text>
                </View>
            </View>
            {
                Indicators.length <= 0 ? <Text>Cargando datos...</Text> :
                    <>
                        <Text color='blue700' fontSize={rv(hp(4))} mt={rv(hp(3))}>Grafico de unidad</Text>
                        <View justifyContent='center' alignItems='center' >
                            <LineChart
                                data={{
                                    labels: Indicators.map(x => moment(x.fecha).format('DD/MM')).slice(-10),
                                    datasets: [
                                        {
                                            data: Indicators.map(x => x.valor).slice(-10), //datosreverse.map(x => (120 * parseInt(x.duracion.substring(0, 2))) / 60).reverse().slice(-7),
                                            strokeWidth: 3
                                        }
                                    ],
                                    legend: ['Valor']
                                }}
                                verticalLabelRotation={50}
                                width={rv(wp(92))}
                                height={rv(hp(42))}
                                yAxisLabel={item.unidad_medida === 'Porcentaje' ? '%' : '$'}
                                yAxisSuffix=""
                                yAxisInterval={1}
                                chartConfig={{
                                    backgroundColor: "#fff",
                                    backgroundGradientFrom: "#021B79",
                                    backgroundGradientTo: "#0575E6",
                                    decimalPlaces: 1,
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        padding: 20,
                                    },
                                    propsForDots: {
                                        r: "3",
                                        strokeWidth: "3",
                                        stroke: "white"
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 20,
                                    borderRadius: 26,
                                }}
                            />
                        </View>
                    </>
            }
        </View>
    )
}

export default WeekDetails
