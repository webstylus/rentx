import React from 'react'
import {
  Container,
  Title,
  Header,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue
} from './styles'
import { BackButton } from '../../components/BackButton'
import { useTheme } from 'styled-components'
import ArrowSvg from '../../assets/arrow.svg'
import { StatusBar } from 'react-native'

export function Scheduling() {
  const theme = useTheme()
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle={'light-content'}
          translucent
          backgroundColor={'transparent'}
        />
        <BackButton color={theme.colors.shape} onPress={() => {}} />
        <Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={false}>{'25/09/2021'}</DateValue>
          </DateInfo>

          <ArrowSvg width={48} height={10} />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={false}>{'30/09/2021'}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
    </Container>
  )
}
