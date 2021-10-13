import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
  padding-top: 96px;
`
export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
`
export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
`
export const SubTitle = styled.Text`
  margin-top: 16px;
  text-align: center;
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.primary_400};
`

export const ContainerButton = styled.View`
  width: 80px;
  margin-top: 80px;
`
