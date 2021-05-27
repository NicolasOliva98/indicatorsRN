import React from 'react'
import { View, Text } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { rv, wp } from '../helpers/responsive'

const WeekDetails = () => {
    return (
        <View>
            <LineChart
                data={{
                    labels: datosreverse.map(x => `${x.fecha.substring(0, 5)}`).reverse().slice(-7),
                    datasets: [
                        {
                            data: datosreverse.map(x => (120 * parseInt(x.duracion.substring(0, 2))) / 60).reverse().slice(-7),
                            strokeWidth: 4
                        }
                    ],
                    legend: ['Litros']
                }}

                width={wp(100)}
                height={rv(hp(50))}
                yAxisLabel=" "
                yAxisSuffix=" Litros"
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#83a4d4",
                    backgroundGradientTo: "#b6fbff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(29, 45, 80, ${opacity})`,
                    style: {
                        borderRadius: 16,

                    },
                    propsForDots: {
                        r: "7",
                        strokeWidth: "2",
                        stroke: "#fff"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,

                }}
            />
        </View>
    )
}

export default WeekDetails
