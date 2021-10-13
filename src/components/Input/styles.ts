import styled from 'styled-components/native'
import {RFValue} from "react-native-responsive-fontsize";
import {TextInput} from "react-native";
import {css} from "styled-components";

interface Props {
    isFocused: boolean
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`
export const InputText = styled(TextInput)<Props>`
  flex: 1;
  
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  background-color: ${({ theme }) => theme.colors.background_secondary};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;

  ${({isFocused, theme}) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`

export const IconContainer = styled.View<Props>`
  width: 55px;
  height: 56px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  margin-right: 2px;

  ${({isFocused, theme}) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`
