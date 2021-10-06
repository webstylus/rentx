import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper'

interface DateValueProps {
  selected: boolean
}

export const Container = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;
  line-height: ${RFValue(34)}px;
  margin: 24px 0;
`

export const Header = styled.View`
  width: 100%;
  height: 325px;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: center;
  padding: ${getStatusBarHeight() + 30}px 25px 24px 25px;
`
export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const DateInfo = styled.View`
  width: 30%;
`
export const DateTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`
export const DateValue = styled.Text<DateValueProps>`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  padding-bottom: 15px;

  ${({ selected, theme }) =>
    !selected &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${({ theme }) => theme.colors.text};
    `}
`
export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24
  },
  showsVerticalScrollIndicator: false
})`
  
`
export const Footer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background_primary};
  padding: 24px 24px ${getBottomSpace() + 24}px;
`
