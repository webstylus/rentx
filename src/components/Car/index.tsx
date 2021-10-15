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
import { useNetInfo } from '@react-native-community/netinfo'
import { RectButtonProps } from 'react-native-gesture-handler'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { Car as ModelCar } from '../../database/model/Cars'

interface Props extends RectButtonProps {
  data: ModelCar
}

export function Car({ data, ...rest }: Props) {
  const netInfo = useNetInfo()
  const MotorIcon = getAccessoryIcon(data.fuel_type)
  return (
    <Container {...rest}>
      <Details>
        <Brands>{data.brand}</Brands>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${
              netInfo.isConnected === true ? data.price : '...'
            }`}</Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} resizeMode={'contain'} />
    </Container>
  )
}
