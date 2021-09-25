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
  About,
  Accessories,
  Footer
} from './styles'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import {Accessory} from "../../components/Accessory";

import SpeedSvg from '../../assets/speed.svg'
import AccelerationSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'
import {Button} from "../../components/Button";
import {useTheme} from "styled-components";

export function CarDetails() {
  const theme = useTheme()
  const thumbnail = 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
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

        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide
          indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button color={theme.colors.main} title={'Escolher período do aluguel'} />
      </Footer>
    </Container>
  )
}
