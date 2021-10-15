import React, { useEffect, useState } from 'react'

import { useNetInfo } from '@react-native-community/netinfo'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler'
import { synchronize } from '@nozbe/watermelondb/sync'
import { useNavigation } from '@react-navigation/native'
import {Alert, StatusBar, StyleSheet} from 'react-native'
import { Car } from '../../components/Car'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { LoadingAnimation } from '../../components/LoadingAnimation'
import { Car as ModelCar } from '../../database/model/Cars'
import { database } from '../../database'
import { api } from '../../services/api'

import { Ionicons } from '@expo/vector-icons'
import LogoSvg from '../../assets/logo.svg'
import {
  Container,
  Header,
  HeaderContainer,
  TotalCars,
  CarList
} from './styles'

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated'

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

export function Home() {
  const netInfo = useNetInfo()
  const theme = useTheme()
  const navigation = useNavigation()
  const [cars, setCars] = useState<ModelCar[]>({} as ModelCar[])
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
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX
      positionY.value = ctx.positionY + event.translationY
    },
    onEnd() {
      positionX.value = withSpring(0)
      positionY.value = withSpring(0)
    }
  })
  function handleCarDetails(car: ModelCar) {
    navigation.navigate('CarDetails', { car })
  }
  function handleMyCars() {
    navigation.navigate('MyCars')
  }
  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        )
        const { changes, latestVersion } = response.data
        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users
        await api.post('/users/sync', user).catch(console.log)
      }
    })
  }

  useEffect(() => {
    let isMounted = true
    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars')
        const cars = await carCollection.query().fetch()

        if (isMounted) {
          setCars(cars)
        }
      } catch (e) {
        console.log(e)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchCars().then()
    return () => {
      isMounted = false
    }
  }, [])
  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize().then()
    }
  }, [netInfo.isConnected])

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
