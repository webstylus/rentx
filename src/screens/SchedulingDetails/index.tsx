import React, { useEffect, useState } from 'react'
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer
} from './styles'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button'
import { useTheme } from 'styled-components'

import { Feather } from '@expo/vector-icons'

import { RFValue } from 'react-native-responsive-fontsize'
import { useNavigation, useRoute } from '@react-navigation/native'
import { CarDTO } from '../../dtos/CarDTO'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { format } from 'date-fns'
import { getPlatformDate } from '../../utils/getPlatformDate'
import { api } from '../../services/api'
import { Alert } from 'react-native'

interface Params {
  car: CarDTO
  dates: string[]
}

interface RentalPeriod {
  start: string
  end: string
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  )
  const route = useRoute()
  const { car, dates } = route.params as Params
  const theme = useTheme()
  const navigation = useNavigation()
  const rentalTotal = Number(dates.length * car.rent.price)
  const [enabled, setEnabled] = useState(true)

  async function handleRentalConfirm() {
    setEnabled(false)
    const scheduleByCar = await api.get(`/schedules_bycars/${car.id}`)
    const unavailable_dates = [
      ...scheduleByCar?.data.unavailable_dates,
      ...dates
    ]

    await api.post(`/schedules_byuser`, {
      user_id: 2,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      )
    })

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
      })
      .then(() => navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\naté a concessionária da RENTX`,
        nextScreenRoute: 'Home'
      }))
      .catch((e) => {
        console.log(e)
        setEnabled(true)
        Alert.alert('Erro!', 'Não foi possível confirmar o agendamento')
      })
  }

  function handleBack() {
    navigation.goBack()
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      )
    })
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imageUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
              key={accessory.type}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name={'calendar'}
              size={RFValue(24)}
              color={theme.colors.background_secondary}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather name={'chevron-right'} size={10} color={theme.colors.text} />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          color={theme.colors.success}
          title={'Alugar agora'}
          onPress={handleRentalConfirm}
          enabled={enabled}
          loading={!enabled}
        />
      </Footer>
    </Container>
  )
}
