import { Center, Image, Text, VStack } from 'native-base'

import bgCover from '@assets/background.png'
import Logo from '@assets/logo.svg'

const SignIn = () => {
  return (
    <VStack flex={1} safeArea bgColor={'gray.700'}>
      <Image
        source={bgCover}
        alt={'Pessoas trienandos'}
        position={'absolute'}
        resizeMode={'contain'}
      />

      <Center marginY={24}>
        <Logo />
        <Text color={'gray.100'} fontSize={'sm'}>
          Treine sua mente e sue corpo
        </Text>
      </Center>
    </VStack>
  )
}

export { SignIn }
