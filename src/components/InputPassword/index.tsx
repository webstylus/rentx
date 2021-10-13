import React, { useState } from 'react'
import {
  Container,
  InputText,
  IconContainer,
  ChangePasswordVisibilityButton
} from './styles'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'
import { TextInputProps } from 'react-native'

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
  value?: string
}

export function InputPassword({ iconName, value, ...rest }: Props) {
  const theme = useTheme()
  const [isPasswordVisible, setIsPasswordVisible] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  function handleIsFocused() {
    setIsFocused(true)
  }

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!value) //!!transforma em um valor lógico, true ou false caso n tenha conteúdo
  }

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        onFocus={handleIsFocused}
        onBlur={handleInputBlur}
        secureTextEntry={isPasswordVisible}
        isFocused={isFocused}
        {...rest}
      />
      <ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange} >
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </ChangePasswordVisibilityButton>
    </Container>
  )
}
