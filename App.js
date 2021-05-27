import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import GeoLocation from '@react-native-community/geolocation';
import Root from './src/routes/Root';

export default App = () => {
  const [currentLatitude, setCurrentLatitude] = useState('')
  const [currentLongitude, setCurrentLongitude] = useState('')

  const getcurrentLocation = () => {
    GeoLocation.getCurrentPosition((position) => {
      let currentLatitude = JSON.stringify(position.coords.latitude)
      let currentLongitude = JSON.stringify(position.coords.longitude)
      setCurrentLatitude(currentLatitude)
      setCurrentLongitude(currentLongitude)
    }, (error) => alert(error.message), {
      enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
    })
  }

//Esta funcion se crea para versiones de sdk menor al 23, superior a ella la ubicación se proporciona automaticamente.
  const callLocation = () => { 
    if (Platform.OS === 'ios') {
      getcurrentLocation()
    } else {
      const requesPermission = async () => {
        const granted = await PermissionsAndroid.request( 
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permisos de localización',
            message: 'La aplicación necesita la ubicacion actual',
            buttonNegative: 'cancelar',
            buttonPositive: 'Aceptar',
            buttonNeutral: 'En otro momento'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getcurrentLocation()
        } else {
          alert('Permisos denegados')
        }
      }
      requesPermission();
    }
  }

  useEffect(() => {
    callLocation()
    return () => {

    }
  }, [])

  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  )
}
