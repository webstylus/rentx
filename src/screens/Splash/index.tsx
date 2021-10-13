import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Extrapolate,runOnJS
} from 'react-native-reanimated'
import { Container } from './styles'
import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'
import {useNavigation} from "@react-navigation/native";

export function Splash() {
  const navigation = useNavigation()
  const splashAnimation = useSharedValue(0)
  const brandStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })
  const logoStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })

  function startApp(){
    navigation.navigate('SignIn')
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      'worklet'
      runOnJS(startApp)()
    })
  })

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={'transparent'}
      />

      <Animated.View style={[brandStyles, { position: 'absolute' }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyles, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  )
}
