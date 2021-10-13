import React, { useState } from 'react'
import {
  Container,
  Header,
  Title,
  SubTitle,
  Steps,
  Form,
  FormTitle
} from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { BackButton } from '../../components/BackButton'
import { Bullet } from '../../components/Bullet'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native'
import { Button } from '../../components/Button'
import { InputPassword } from '../../components/InputPassword'
import { useTheme } from 'styled-components'
import { api } from '../../services/api'

interface Params {
  user: {
    name: string
    email: string
    driverLicense: string
  }
}

export function SignUpSecondStep() {
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const { user } = route.params as Params
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  function handleBack() {
    navigation.goBack()
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Atenção', 'Informe a senha e a confirmação.')
    }
    if (password !== passwordConfirm) {
      return Alert.alert('Atenção', 'As senhas não são iguais.')
    }

    await api
      .post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          title: 'Conta criada',
          message: `Agora é só fazer login\ne aproveitar.`,
          nextScreenRoute: 'SignIn'
        })
      })
      .catch(() => {
        Alert.alert('Atenção', 'Não foi possível realizar o cadastro.')
      })
  }

  return (
    <KeyboardAvoidingView behavior={'position'} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>
          <Title>Crie sua {'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de {'\n'}forma rápida e fácil.</SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <InputPassword
              iconName={'lock'}
              placeholder={'Senha'}
              onChangeText={setPassword}
              value={password}
            />
            <InputPassword
              iconName={'lock'}
              placeholder={'Repetir a Senha'}
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
          <Button
            title={'Cadastrar'}
            onPress={handleRegister}
            loading={false}
            enabled
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
