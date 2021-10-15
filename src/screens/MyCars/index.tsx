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
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { Car } from '../../components/Car'
import { AntDesign } from '@expo/vector-icons'
import { LoadingAnimation } from '../../components/LoadingAnimation'
import { Car as ModelCar } from '../../database/model/Cars'
import { format, parseISO } from 'date-fns'

interface CarProps {
  id: string
  user_id: string
  car: CarDTO
  startDate: string
  endDate: string
}

interface DataProps {
  id: string
  car: ModelCar
  start_date: string
  end_date: string
}

export function MyCars() {
  const navigation = useNavigation()
  const theme = useTheme()
  const [cars, setCars] = useState<DataProps[]>([])
  const [loading, setLoading] = useState(true)
  const screensIsFocus = useIsFocused()

  function handleBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`/rentals`)
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
          }
        })

        setCars(dataFormatted)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    fetchCars().then()
  }, [screensIsFocus])

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
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name={'arrowright'}
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
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
