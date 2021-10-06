import React from 'react'
import { StatusBar, useWindowDimensions } from 'react-native'
import { Button } from '../../components/Button'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'

import { Container, Content, Title, SubTitle, ContainerButton } from './styles'
import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

export function SchedulingComplete() {
  const { width } = useWindowDimensions()
  const theme = useTheme()
  const navigation = useNavigation()
    function handleBack() {
        navigation.navigate('Home')
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
        <Title>Carro alugado!</Title>
        <SubTitle>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </SubTitle>

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
