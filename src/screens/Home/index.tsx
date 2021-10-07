import React, { useEffect, useState } from 'react'
import { CarDTO } from '../../dtos/CarDTO'

import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { Car } from '../../components/Car'
import { RFValue } from 'react-native-responsive-fontsize'
import { Loading } from '../../components/Loading'
import { Ionicons } from '@expo/vector-icons'

import LogoSvg from '../../assets/logo.svg'
import {
  Container,
  Header,
  HeaderContainer,
  TotalCars,
  CarList,
  MyCarsButton
} from './styles'
import { api } from '../../services/api'
import { useTheme } from 'styled-components'

export function Home() {
  const theme = useTheme()
  const navigation = useNavigation()
  const [cars, setCars] = useState<CarDTO[]>({} as CarDTO[])
  const [isLoading, setIsLoading] = useState(true)

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  async function fetchCars() {
    try {
      const response = await api.get('/cars')
      setCars(response.data)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  function handleMyCars() {
    navigation.navigate('MyCars')
  }

  useEffect(() => {
    fetchCars().then()
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Header>
        <HeaderContainer>
          <LogoSvg width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContainer>
      </Header>

      {!isLoading ? (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      ) : (
        <Loading />
      )}

      <MyCarsButton onPress={handleMyCars}>
        <Ionicons name={'ios-car-sport'} size={32} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  )
}
