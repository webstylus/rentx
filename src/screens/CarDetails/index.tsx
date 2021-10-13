import React from 'react'
import { CarDTO } from '../../dtos/CarDTO'

import { useNavigation, useRoute } from '@react-navigation/native'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button'
import { useTheme } from 'styled-components'
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  Extrapolate,
  interpolateColor
} from 'react-native-reanimated'
import {
  About,
  Accessories,
  Brand,
  CarImages,
  Container,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent
} from './styles'

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { StatusBar, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

interface Params {
  car: CarDTO
}

export function CarDetails() {
  const scrollY = useSharedValue(0)
  const navigation = useNavigation()
  const theme = useTheme()
  const route = useRoute()
  const { car } = route.params as Params

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })
  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 100],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP)
    }
  })

  const backButtonStyleAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [150, 100],
        [theme.colors.background_primary, theme.colors.background_secondary]
      )
    }
  })

  function handleBack() {
    navigation.goBack()
  }

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car })
  }

  return (
    <Container>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          {
            backgroundColor: theme.colors.background_secondary
          }
        ]}
      >
        <Header>
          <Animated.View
            style={[backButtonStyleAnimation, {
              borderRadius: 13,
              width: 26,
              height: 26,
              justifyContent: "center",
              alignItems: "center"
            }]}
          >
            <BackButton onPress={handleBack}/>
          </Animated.View>
        </Header>

        <Animated.View style={sliderCarStyleAnimation}>
          <CarImages>
            <ImageSlider imageUrl={car.photos} />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
              key={accessory.type}
            />
          ))}
        </Accessories>

        <About>
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button
          color={theme.colors.main}
          title={'Escolher período do aluguel'}
          onPress={handleConfirmRental}
          enabled
        />
      </Footer>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  }
})
