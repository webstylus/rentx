import React from 'react'
import { Container, Title } from './styles'
import { RectButtonProps } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'

interface Props extends RectButtonProps {
  title: string
  color?: string
  enabled?: boolean
  loading?: boolean
}

export function Button({
  title,
  color,
  enabled = false,
  loading = false,
  ...rest
}: Props) {
  const theme = useTheme()
  return (
    <Container
      color={color}
      {...rest}
      enabled={enabled}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  )
}
