import { VStack } from 'native-base'
import { Header } from '@components/Header'

const Profile = () => {
  return (
    <VStack flex={1} bgColor={'gray.700'}>
      <Header title={'Perfil'} />
    </VStack>
  )
}

export { Profile }
