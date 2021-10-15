# RENTX

Aplicação Expo desenvolvida em React Native usando TypeScript
![alt text](https://github.com/webstylus/rentx/blob/main/src/assets/images/cover.png?raw=true)

O Intuito desse App é consumir uma API com uma lista de veículos, e você poder agendar um período de locação.
Seus veículos alugados ficam disponíveis em sua lista de veículos acessada na Home do App.

###Instalação

Você precisa ter o expo-cli instalado e configurado

```
Executar o servidor de api localmente: 
https://github.com/rodrigorgtic/rentx-api-ignite
```

```
    $ yarn install
    $ yarn start
    $ abra seu emulador Android
    $ yarn android 
```

Principais pacotes extra instalados
- expo-font
- @expo-google-fonts/poppins
- expo-app-loading
- prettier
- styled-components
- react-native-responsive-fontsize
- react-native-iphone-x-helper
- react-native-svg-transformer
- [@react-navigation/native](https://reactnavigation.org/)
- [date-fns](https://date-fns.org/)
- [react-native-calendars](https://github.com/wix/react-native-calendars)
- [react-native-reanimated](https://docs.expo.dev/versions/latest/sdk/reanimated/)
- [lottie-react-native](https://docs.expo.dev/versions/latest/sdk/lottie/)
- yup
- [@nozbe/watermelondb](https://nozbe.github.io/WatermelonDB/)
- [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [react-native-netinfo](https://github.com/react-native-netinfo/react-native-netinfo)
- [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)

##Feature para implementar

- Alteração de senha
- Atualização dos dados do perfil só funciona offline, fazer em realtime.
- Direcionar para tela de sucesso após salvar dados do Profile
- Ajustar ScrollView com KeyboardAvoidView na tela de Profile.
- Adicionar animação da tela de CarDetails na tela de SchedulingDetails também.
- Adiciona link dos veículos alugados para direcionar para CarDetails.
- Fazer ajustes finos de layout.

[Figma](https://www.figma.com/file/CSmHFEEIr30Ia31et6UKqu/RentX-Ignite---Offline-First?node-id=5985%3A1799)
