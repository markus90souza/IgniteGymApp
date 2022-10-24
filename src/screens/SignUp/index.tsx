import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'

import bgCover from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

const SignUp = () => {
  const { goBack } = useNavigation<AuthNavigatorRoutesProps>()

  const handleGoBack = () => {
    goBack()
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <VStack flex={1} safeArea bgColor={'gray.700'} px={10}>
        <Image
          source={bgCover}
          defaultSource={bgCover}
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
            Crie sua conta
          </Heading>

          <Input placeholder="Nome" mb={4} autoCorrect={false} />

          <Input
            placeholder="E-mail"
            mb={4}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
          />

          <Input placeholder="Senha" mb={4} secureTextEntry />

          <Button name={'Criar e acessar'} />
        </Center>

        <Button
          marginTop={24}
          name={'Voltar para o login'}
          variant={'outline'}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}

export { SignUp }
