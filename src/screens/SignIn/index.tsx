import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base'
import bgCover from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/appError'
import { useState } from 'react'

type FormData = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup
    .string()
    .required('Informe o seu email')
    .email('Informe um email valido'),
  password: yup
    .string()
    .required('Informe uma senha')
    .min(8, 'No minimo 8 caracters '),
})

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

  const toast = useToast()

  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  })

  const handleGoSignUp = () => {
    navigate('signUp')
  }

  const handleSignIn = async ({ email, password }: FormData) => {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível entrar na sua conta, Tente novamente mais tarde !'
      setIsLoading(false)
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
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
            Acesse sua conta
          </Heading>
          <Controller
            name={'email'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                mb={4}
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={'email-address'}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name={'password'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                mb={4}
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Button
            name={'Acessar'}
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>
        <Center marginTop={24}>
          <Text color={'gray.100'} fontFamily={'body'} fontSize={'sm'} mb={3}>
            Ainda não tem acesso ?
          </Text>
          <Button
            name={'Criar conta'}
            variant={'outline'}
            onPress={handleGoSignUp}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}

export { SignIn }
