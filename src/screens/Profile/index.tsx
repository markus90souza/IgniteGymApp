import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  useToast,
  VStack,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { Header } from '@components/Header'
import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
// FORM: VALIDATION AND CONTROLLER
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'
import { AppError } from '@utils/appError'

type FormDataProps = {
  name: string
  email: string
  password: string
  old_password: string
  confirm_password: string
}

const profileSchema = yup.object({
  name: yup.string(),
  password: yup
    .string()
    .min(8, 'No minimo 8 caracteres')
    .nullable()
    .transform((value) => value || null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => value || null)
    .oneOf([yup.ref('password'), null], 'A Confirmação de senha não confere')
    .when('password', {
      is: (field: any) => field,
      then: yup
        .string()
        .nullable()
        .required('Informe a confirmação de senha')
        .transform((value) => value || null),
    }),
})

const Profile = () => {
  const [photoIsLoading, setphotoIsLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/markus90souza.png',
  )

  const toast = useToast()
  const { user, updateProfile } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  })

  const handleSelectPhotoProfile = async () => {
    try {
      setphotoIsLoading(true)
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })

      if (photoSelected.canceled) {
        return
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri,
        )
        console.log(photoInfo.size)

        const imageSize = photoInfo.size

        if (imageSize && imageSize / 1024 / 1024 > 5) {
          return toast.show({
            title: 'Image Grande',
            placement: 'top',
            bgColor: 'red.500',
          })
        }
        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setphotoIsLoading(false)
    }
  }

  const handleUpdateProfile = async (data: FormDataProps) => {
    console.log(data)

    try {
      setIsLoading(true)
      const userUpdate = user
      userUpdate.name = data.name
      await api.post('/users', data)

      await updateProfile(userUpdate)
      toast.show({
        title: 'Os seus dados foram atualizados com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      })
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possivel fazer a atualização do seu perfil, tente novamente mais tarde!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })

      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1} bgColor={'gray.700'}>
      <Header title={'Perfil'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        <Center marginTop={6} paddingX={10}>
          {photoIsLoading ? (
            <Skeleton
              w={33}
              h={33}
              rounded={'full'}
              startColor={'gray.500'}
              endColor={'gray.400'}
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt={'Minha foto'}
              size={33}
            />
          )}

          <TouchableOpacity onPress={handleSelectPhotoProfile}>
            <Text
              color={'green.500'}
              fontWeight={'bold'}
              fontSize={'md'}
              marginTop={2}
              marginBottom={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                bgColor={'gray.600'}
                marginBottom={4}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                bgColor={'gray.600'}
                marginBottom={4}
                value={value}
                onChangeText={onChange}
                isDisabled
              />
            )}
          />

          <Heading
            color={'gray.200'}
            fontSize={'md'}
            marginTop={12}
            marginBottom={2}
            alignSelf={'flex-start'}
          >
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name={'old_password'}
            render={({ field: { onChange } }) => (
              <Input
                bgColor={'gray.600'}
                placeholder={'Senha antiga'}
                secureTextEntry
                marginBottom={4}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name={'password'}
            render={({ field: { onChange } }) => (
              <Input
                bgColor={'gray.600'}
                placeholder={'Nova senha'}
                secureTextEntry
                marginBottom={4}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name={'confirm_password'}
            render={({ field: { onChange } }) => (
              <Input
                bgColor={'gray.600'}
                placeholder={'Confirme nova senha'}
                secureTextEntry
                marginBottom={4}
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            name={'Atualizar perfil'}
            onPress={handleSubmit(handleUpdateProfile)}
            isLoading={isLoading}
            isLoadingText={'Atualizando os dados'}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}

export { Profile }
