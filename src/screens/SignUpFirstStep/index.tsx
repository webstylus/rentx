import React, {useEffect, useState} from 'react'
import {
    Container,
    Header,
    Title,
    SubTitle,
    Steps,
    Form,
    FormTitle
} from './styles'
import {useNavigation, useRoute} from '@react-navigation/native'
import {BackButton} from '../../components/BackButton'
import {Bullet} from '../../components/Bullet'
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from 'react-native'
import {Input} from '../../components/Input'
import {Button} from '../../components/Button'
import * as Yup from 'yup'

export function SignUpFirstStep() {
    const navigation = useNavigation()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [driverLicense, setDriverLicense] = useState('')
    const route = useRoute()

    function handleBack() {
        navigation.goBack()
    }

    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('A CNH é obrigatória.'),
                email: Yup.string()
                    .email('E-mail inválido')
                    .required('O e-mail é obrigatório.'),
                name: Yup.string().required('Nome é obrigatório.')
            })
            const data = {name, email, driverLicense}
            await schema.validate(data)
            navigation.navigate('SignUpSecondStep', {user: data})
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Atenção!', error.message)
            } else {
                return Alert.alert(
                    'Erro no cadastro!',
                    'Ocorreu um erro ao validar seus dados, verifique.'
                )
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior={'position'} enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleBack}/>
                        <Steps>
                            <Bullet active/>
                            <Bullet/>
                        </Steps>
                    </Header>
                    <Title>Crie sua {'\n'}conta</Title>
                    <SubTitle>Faça seu cadastro de {'\n'}forma rápida e fácil.</SubTitle>

                    <Form>
                        <FormTitle>1. Dados</FormTitle>
                        <Input
                            iconName={'user'}
                            placeholder={'Nome'}
                            autoCorrect={false}
                            onChangeText={setName}
                            value={name}
                        />
                        <Input
                            iconName={'mail'}
                            placeholder={'E-mail'}
                            keyboardType={'email-address'}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            onChangeText={setEmail}
                            value={email}
                        />
                        <Input
                            iconName={'credit-card'}
                            placeholder={'CNH'}
                            keyboardType={'numeric'}
                            onChangeText={setDriverLicense}
                            value={driverLicense}
                        />
                    </Form>
                    <Button
                        title={'Próximo'}
                        onPress={handleNextStep}
                        loading={false}
                        enabled
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
