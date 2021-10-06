import React from 'react'
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
import { RectButtonProps } from 'react-native-gesture-handler'
import { CarDTO } from '../../dtos/CarDTO'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

interface Props extends RectButtonProps {
  data: CarDTO
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type)
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
            <MotorIcon/>
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} resizeMode={'contain'} />
    </Container>
  )
}
