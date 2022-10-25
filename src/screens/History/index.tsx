import { Header } from '@components/Header'
import { VStack } from 'native-base'

const History = () => {
  return (
    <VStack flex={1} bgColor={'gray.700'}>
      <Header title={'Histórico'} />
    </VStack>
  )
}

export { History }
