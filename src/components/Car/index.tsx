import React from 'react'

import GasolineSvg from '../../assets/gasoline.svg'

import {
  Container,
  Details,
  Brands,
  Name,
  About,
  Rent,
  Period,
  Price,
  CarImage,
  Type
} from './styles'
import {useTheme} from "styled-components";
import {RectButtonProps} from "react-native-gesture-handler";

interface CarData {
  id: string
  brand: string
  name: string
  rent: {
    period: string
    price: number
  },
  thumbnail: string
}

interface Props extends RectButtonProps{
  data: CarData
}

export function Car({ data, ...rest }: Props) {
  const theme = useTheme()

  return (
    <Container {...rest}>
      <Details>
        <Brands>{data.brand}</Brands>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>
          <Type>
            <GasolineSvg width={20} height={20} color={theme.colors.text_detail} />
          </Type>
        </About>
      </Details>

      <CarImage source={{uri: data.thumbnail}}  resizeMode={'contain'}/>
    </Container>
  )
}
