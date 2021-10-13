# RENTX

Aplicação Expo desenvolvida em React Native usando TypeScript
![alt text](https://github.com/webstylus/rentx/blob/main/src/assets/images/cover.png?raw=true)

O Intuito desse App é consumir uma API com uma lista de veículos, e você poder agendar um período de locação.
Seus veículos alugados ficam disponíveis em sua lista de veículos acessada na Home do App.

###Instalação

Você precisa ter o expo-cli instalado e configurado em sua máquina

```
Executar o servidor de api localmente:
Configure seu *baseURL* em ./src/services/api.ts com seu ip e porta 
Execute o comando abaixo substituindo o $ip pelo seu ip de rede local

    $ json-server ./src/services/server.json --host $seuip --port 3333 --delay 700
```

```
    $ yarn install
    $ expo start
    $ abra seu emulador de preferência
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
