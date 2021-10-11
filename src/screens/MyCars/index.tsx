import React, { useEffect, useState } from 'react'
import {
  Container,
  Title,
  Header,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate
} from './styles'
import { CarDTO } from '../../dtos/CarDTO'
import { api } from '../../services/api'
import { FlatList, StatusBar } from 'react-native'
import { BackButton } from '../../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { Car } from '../../components/Car'
import { AntDesign } from '@expo/vector-icons'
import {LoadingAnimation} from "../../components/LoadingAnimation";

interface CarProps {
  id: string
  user_id: string
  car: CarDTO
  startDate: string
  endDate: string
}

export function MyCars() {
  const navigation = useNavigation()
  const theme = useTheme()
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)

  function handleBack() {
    navigation.goBack()
  }

  async function fetchCars() {
    try {
      const response = await api.get(`/schedules_byuser?user_id=2`)
      setCars(response.data)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCars().then()
  }, [])

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle={'light-content'}
          translucent
          backgroundColor={'transparent'}
        />
        <BackButton color={theme.colors.shape} onPress={handleBack} />
        <Title>
          Seus agendamentos{'\n'}
          estão aqui.
        </Title>
        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <CarWrapper key={item.id}>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name={'arrowright'}
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
            showsVerticalScrollIndicator={false}
          />
        </Content>
      )}
    </Container>
  )
}
