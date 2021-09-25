import React from 'react'
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

import {Feather} from '@expo/vector-icons'

import SpeedSvg from '../../assets/speed.svg'
import AccelerationSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'
import {RFValue} from "react-native-responsive-fontsize";
import {useNavigation} from "@react-navigation/native";

export function SchedulingDetails() {
  const theme = useTheme()
  const thumbnail = 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  const navigation = useNavigation()
  function handleRentalConfirm(){
    navigation.navigate('SchedulingComplete')
  }
  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>

      <CarImages>
        <ImageSlider imageUrls={[thumbnail]} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Harucan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name={'380km/h'} icon={SpeedSvg} />
          <Accessory name={'3.2s'} icon={AccelerationSvg} />
          <Accessory name={'800 HP'} icon={ForceSvg} />
          <Accessory name={'Gasolina'} icon={GasolineSvg} />
          <Accessory name={'Auto'} icon={ExchangeSvg} />
          <Accessory name={'2 pessoas'} icon={PeopleSvg} />
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name={'calendar'} size={RFValue(24)} color={theme.colors.background_secondary} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>25/09/2021</DateValue>
          </DateInfo>
          <Feather name={'chevron-right'} size={10} color={theme.colors.text} />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>30/09/2021</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          color={theme.colors.success}
          title={'Alugar agora'}
          onPress={handleRentalConfirm}
        />
      </Footer>
    </Container>
  )
}
