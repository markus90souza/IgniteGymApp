import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import bgCover from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

type FormData = {
  name: string
  email: string
  password: string
  password_confirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o seu nome'),
  email: yup
    .string()
    .required('Informe o seu email')
    .email('Informe um email valido'),
  password: yup
    .string()
    .required('Informe uma senha')
    .min(8, 'No minimo 8 caracters '),

  password_confirm: yup
    .string()
    .required('Confirme sua senha')
    .oneOf([yup.ref('password'), null], 'A confirmação da senha não confere'),
})

const SignUp = () => {
  const { goBack } = useNavigation<AuthNavigatorRoutesProps>()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
  })
  const handleGoBack = () => {
    goBack()
  }

  const onHandleSignUp = (data: FormData) => {
    console.log(data)
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

          <Controller
            name={'name'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                autoComplete={'name'}
                mb={4}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

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

          <Controller
            name={'password_confirm'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Comfirmar senha"
                mb={4}
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password_confirm?.message}
                onSubmitEditing={handleSubmit(onHandleSignUp)}
                returnKeyType={'send'}
              />
            )}
          />

          <Button
            name={'Criar e acessar'}
            onPress={handleSubmit(onHandleSignUp)}
          />
        </Center>

        <Button
          marginTop={16}
          name={'Voltar para o login'}
          variant={'outline'}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}

export { SignUp }
