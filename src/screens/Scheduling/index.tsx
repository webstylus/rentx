import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { format } from 'date-fns'
import { getPlatformDate } from '../../utils/getPlatformDate'
import { BackButton } from '../../components/BackButton'
import { useTheme } from 'styled-components'
import { Button } from '../../components/Button'
import { Alert, StatusBar } from 'react-native'
import { CarDTO } from '../../dtos/CarDTO'
import {
  Calendar,
  generateInterval,
  DayProps,
  MarkedDateProps
} from '../../components/Calendar'
import {
  Container,
  Title,
  Header,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles'
import ArrowSvg from '../../assets/arrow.svg'

interface RentalPeriodProps {
  start: number
  startFormatted: string
  end: number
  endFormatted: string
}

interface Params {
  car: CarDTO
}

export function Scheduling() {
  const route = useRoute()
  const { car } = route.params as Params
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  )
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  )
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
    {} as RentalPeriodProps
  )

  const theme = useTheme()
  const navigation = useNavigation()

  function handleBack() {
    navigation.goBack()
  }

  function handleConfirm() {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      return Alert.alert(
        'Selecione as datas',
        'Você deve selecionar um período para locação'
      )
    }
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates)
    })
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectedDate(end)
    const interval = generateInterval(start, end)
    setMarkedDates(interval)
    const firstDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy'
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    })
  }

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
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg width={48} height={10} />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title={'Confirmar'}
          onPress={handleConfirm}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  )
}
