import React, { useEffect, useState } from 'react'
import { useNetInfo } from '@react-native-community/netinfo'
import {
  Container,
  HeaderTitle,
  Header,
  HeaderTop,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { BackButton } from '../../components/BackButton'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Input } from '../../components/Input'
import { useAuth } from '../../hooks/auth'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'
import { InputPassword } from '../../components/InputPassword'
import { Button } from '../../components/Button'
import * as Yup from 'yup'

export function Profile() {
  const netInfo = useNetInfo()
  const { user, signOut, updateUser } = useAuth()
  const theme = useTheme()
  const navigation = useNavigation()

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [driverLicense, setDriverLicense] = useState(user.driver_license)

  function handleBack() {
    navigation.goBack()
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    if (netInfo.isConnected === false && optionSelected === 'passwordEdit') {
      return Alert.alert(
        'Você está Offline!',
        'Para mudar a senha conecte-se a internet.'
      )
    }
    setOption(optionSelected)
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })

    if (result.cancelled) {
      return
    }

    if (!result.cancelled) {
      setAvatar(result.uri)
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é Obrigatória'),
        name: Yup.string().required('Nome é obrigatório')
      })

      const data = { name, driverLicense }
      await schema.validate(data)
      await updateUser({
        id: user.id,
        user_id: user.id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token
      })

      Alert.alert('Tudo certo!', 'Perfil atualizado com sucesso.')
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        Alert.alert('Opa!', e.message)
      } else {
        Alert.alert('Falha', 'Ocorreu um erro ao atualizar.')
      }
    }
  }

  async function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, irá precisar de internet para conectar-se novamente',
      [
        {
          text: 'Cancelar',
          onPress: () => {}
        },
        {
          text: 'Sair',
          onPress: () => signOut()
        }
      ]
    )
  }

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          return Alert.alert(
            'Permissão necessária',
            'Você precisa dar permissão para o aplicativo acessar sua camera.'
          )
        }
      }
    })()
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={'position'}
      enabled
      style={{
        flex: 1
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Header>
              <HeaderTop>
                <BackButton color={theme.colors.shape} onPress={handleBack} />
                <HeaderTitle>Profile</HeaderTitle>
                <LogoutButton onPress={handleSignOut}>
                  <Feather
                    name={'power'}
                    size={24}
                    color={theme.colors.shape}
                  />
                </LogoutButton>
              </HeaderTop>

              <PhotoContainer>
                {!!avatar && <Photo source={{ uri: avatar }} />}
                <PhotoButton onPress={handleSelectAvatar}>
                  <Feather
                    name={'camera'}
                    size={24}
                    color={theme.colors.shape}
                  />
                </PhotoButton>
              </PhotoContainer>
            </Header>
            <Content
              style={{
                marginBottom:
                  Platform.OS === 'ios' ? useBottomTabBarHeight() : 0
              }}
            >
              <Options>
                <Option
                  active={option === 'dataEdit'}
                  onPress={() => handleOptionChange('dataEdit')}
                >
                  <OptionTitle active={option === 'dataEdit'}>
                    Dados
                  </OptionTitle>
                </Option>
                <Option
                  active={option === 'passwordEdit'}
                  onPress={() => handleOptionChange('passwordEdit')}
                >
                  <OptionTitle active={option === 'passwordEdit'}>
                    Trocar Senha
                  </OptionTitle>
                </Option>
              </Options>
              {option === 'dataEdit' ? (
                <Section>
                  <Input
                    iconName={'user'}
                    placeholder={'Nome'}
                    autoCorrect={false}
                    onChangeText={setName}
                    defaultValue={user.name}
                  />
                  <Input
                    iconName={'mail'}
                    editable={false}
                    defaultValue={user.email}
                  />
                  <Input
                    iconName={'credit-card'}
                    placeholder={'CNH'}
                    keyboardType={'numeric'}
                    onChangeText={setDriverLicense}
                    defaultValue={user.driver_license}
                  />
                </Section>
              ) : (
                <Section>
                  <InputPassword
                    iconName={'lock'}
                    placeholder={'Senha'}
                    autoCorrect={false}
                  />
                  <InputPassword
                    iconName={'lock'}
                    placeholder={'Nova senha'}
                    autoCorrect={false}
                  />
                  <InputPassword
                    iconName={'lock'}
                    placeholder={'Repetir Senha'}
                    autoCorrect={false}
                  />
                </Section>
              )}

              <Button
                title={'Salvar alterações'}
                onPress={handleProfileUpdate}
                enabled
                loading={false}
              />
            </Content>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
