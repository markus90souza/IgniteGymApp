import { StatusBar } from 'react-native'
import { NativeBaseProvider, Box } from 'native-base'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { Loading } from '@components/Loading'
import { appTheme } from '@theme/index'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })
  return (
    <NativeBaseProvider theme={appTheme}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'light-content'}
      />
      {!fontsLoaded ? <Box>Fontes Carregadas</Box> : <Loading />}
    </NativeBaseProvider>
  )
}
