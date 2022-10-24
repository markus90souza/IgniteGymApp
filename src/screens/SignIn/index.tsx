import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'

import bgCover from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

const SignIn = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <VStack flex={1} safeArea bgColor={'gray.700'} px={10}>
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
        <Center>
          <Heading
            fontFamily={'heading'}
            fontSize={'xl'}
            color={'gray.100'}
            mb={6}
          >
            Acesse sua conta
          </Heading>
          <Input
            placeholder="E-mail"
            mb={4}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
          />
          <Input placeholder="Senha" mb={4} secureTextEntry />
          <Button name={'Acessar'} />
        </Center>
        <Center marginTop={24}>
          <Text color={'gray.100'} fontFamily={'body'} fontSize={'sm'} mb={3}>
            Ainda não tem acesso ?
          </Text>
          <Button name={'Criar conta'} variant={'outline'} />
        </Center>
      </VStack>
    </ScrollView>
  )
}

export { SignIn }
