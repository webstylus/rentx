import React, { useState } from 'react'
import { Container, Title, Header, Form, SubTitle, Footer } from './styles'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native'
import { Button } from '../../components/Button'
import { useTheme } from 'styled-components'
import { Input } from '../../components/Input'
import { InputPassword } from '../../components/InputPassword'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import {useAuth} from "../../hooks/auth";

export function SignIn() {
  const {signIn} = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const theme = useTheme()
  const navigation = useNavigation()

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().required('A senha é obrigatória.'),
        email: Yup.string()
          .required('E-mail obrigatório.')
          .email('Digite um e-mail válido.')
      })

      await schema.validate({ email, password })
      await signIn({email, password})

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Atenção!', error.message)
      } else {
        return Alert.alert(
          'Erro na autenticação!',
          'Ocorreu um erro ao fazer o login, verifique as credenciais'
        )
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep')
  }

  return (
    <KeyboardAvoidingView behavior={'position'} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
            translucent
          />
          <Header>
            <Title>Estamos {'\n'}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar {'\n'}uma experiência incrível.
            </SubTitle>
          </Header>
          <Form>
            <Input
              iconName={'mail'}
              placeholder={'E-mail'}
              keyboardType={'email-address'}
              autoCorrect={false}
              autoCapitalize={'none'}
              onChangeText={setEmail}
              value={email}
            />
            <InputPassword
              iconName={'lock'}
              placeholder={'Senha'}
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          <Footer>
            <Button
              title={'Login'}
              onPress={handleSignIn}
              loading={false}
              enabled
            />
            <Button
              title={'Criar conta gratuita'}
              onPress={handleNewAccount}
              loading={false}
              enabled
              color={theme.colors.background_secondary}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
