import { NavigationContainer } from '@react-navigation/native'
import { Box } from 'native-base'
import { AppRoutes } from './app.routes'
// import { AuthRoutes } from './auth.routes'

const Routes = () => {
  return (
    <Box flex={1} bgColor={'gray.700'}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </Box>
  )
}

export { Routes }
