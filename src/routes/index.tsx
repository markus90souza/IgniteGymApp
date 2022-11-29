import { Box } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
// ROTAS
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'
// HOOK
import { useAuth } from '@hooks/useAuth'
import { Loading } from '@components/Loading'

const Routes = () => {
  const { user, isloadingUserStorage } = useAuth()

  if (isloadingUserStorage) {
    return <Loading />
  }
  return (
    <Box flex={1} bgColor={'gray.700'}>
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}

export { Routes }
