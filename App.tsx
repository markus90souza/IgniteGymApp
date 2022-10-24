import { StatusBar, View } from 'react-native'
import { NativeBaseProvider, Box } from 'native-base'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })
  return (
    <NativeBaseProvider>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'light-content'}
      />
      {fontsLoaded ? <Box>Fontes Carregadas</Box> : <View />}
    </NativeBaseProvider>
  )
}
