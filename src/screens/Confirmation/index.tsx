import React from 'react'
import { StatusBar, useWindowDimensions } from 'react-native'
import { Button } from '../../components/Button'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Container, Content, Title, SubTitle, ContainerButton } from './styles'
import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

interface Params {
  title: string
  message: string
  nextScreenRoute: string
}

export function Confirmation() {
  const { width } = useWindowDimensions()
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const { title, message, nextScreenRoute } = route.params as Params

  function handleBack() {
    navigation.navigate(nextScreenRoute)
  }

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>
        <SubTitle>{message}</SubTitle>

        <ContainerButton>
          <Button
            title={'Ok'}
            color={theme.colors.shape_dark}
            onPress={handleBack}
            enabled
          />
        </ContainerButton>
      </Content>
    </Container>
  )
}
