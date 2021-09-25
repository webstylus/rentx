import React from 'react'
import LogoSvg from '../../assets/logo.svg'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
  Header,
  HeaderContainer,
  TotalCars,
  CarList
} from './styles'
import { StatusBar } from 'react-native'
import { Car } from '../../components/Car'
import { RFValue } from 'react-native-responsive-fontsize'

export function Home() {
  const navigation = useNavigation()

  const thumbnail = 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  const carData = {
    id: '1',
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120
    },
    thumbnail
  }

  function handleCarDetails() {
    navigation.navigate('CarDetails')
  }

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
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContainer>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <Car data={carData} onPress={handleCarDetails} />
        )}
      />
    </Container>
  )
}
