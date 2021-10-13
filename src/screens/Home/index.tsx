import React, { useEffect, useState } from 'react'
import { CarDTO } from '../../dtos/CarDTO'

import { useNavigation } from '@react-navigation/native'
import {StatusBar, StyleSheet} from 'react-native'
import { Car } from '../../components/Car'
import { RFValue } from 'react-native-responsive-fontsize'
import { Ionicons } from '@expo/vector-icons'

import LogoSvg from '../../assets/logo.svg'
import {
  Container,
  Header,
  HeaderContainer,
  TotalCars,
  CarList
} from './styles'

import { api } from '../../services/api'
import { useTheme } from 'styled-components'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
    withSpring
} from 'react-native-reanimated'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler'
import {LoadingAnimation} from "../../components/LoadingAnimation";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

export function Home() {
  const theme = useTheme()
  const navigation = useNavigation()
  const [cars, setCars] = useState<CarDTO[]>({} as CarDTO[])
  const [isLoading, setIsLoading] = useState(true)
  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

  const myCarsButtonStyleAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx:any) {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX
      positionY.value = ctx.positionY + event.translationY
    },
    onEnd(){
      positionX.value = withSpring(0)
      positionY.value = withSpring(0)
    },

  })

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  async function fetchCars() {
    try {
      const response = await api.get('/cars')
      setCars(response.data)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  function handleMyCars() {
    navigation.navigate('MyCars')
  }

  useEffect(() => {
    fetchCars().then()
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Header>
        <HeaderContainer>
          <LogoSvg width={RFValue(108)} height={RFValue(12)} />
          {!isLoading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContainer>
      </Header>

      {!isLoading ? (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      ) : (
        <LoadingAnimation />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyleAnimated,
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}
        >
          <ButtonAnimated
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={handleMyCars}
          >
            <Ionicons
              name={'ios-car-sport'}
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
