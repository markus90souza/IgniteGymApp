import { NavigationContainer } from '@react-navigation/native'
import { Box } from 'native-base'
import { AuthRoutes } from './auth.routes'

const AppRoutes = () => {
  return (
    <Box flex={1} bgColor={'gray.700'}>
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}

export { AppRoutes }
