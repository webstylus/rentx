import React from 'react'
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
import { BackButton } from '../../components/BackButton'
import { useTheme } from 'styled-components'
import ArrowSvg from '../../assets/arrow.svg'
import { StatusBar } from 'react-native'
import {Button} from "../../components/Button";
import {Calendar} from "../../components/Calendar";
import {useNavigation} from "@react-navigation/native";

export function Scheduling() {
  const theme = useTheme()
  const navigation= useNavigation()

  function handleConfirm(){
    navigation.navigate('SchedulingDetails')
  }
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle={'light-content'}
          translucent
          backgroundColor={'transparent'}
        />
        <BackButton color={theme.colors.shape} onPress={() => navigation.goBack()} />
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

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title={'Confirmar'} onPress={handleConfirm} />
      </Footer>
    </Container>
  )
}
