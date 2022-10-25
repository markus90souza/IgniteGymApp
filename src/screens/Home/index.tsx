import { HomeHeader } from '@components/HomeHeader'
import { VStack } from 'native-base'

const Home = () => {
  return (
    <VStack flex={1} bgColor={'gray.700'} safeArea>
      <HomeHeader />
    </VStack>
  )
}

export { Home }
