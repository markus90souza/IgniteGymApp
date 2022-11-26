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

const Profile = () => {
  // eslint-disable-next-line no-unused-vars
  const [photoIsLoading, setphotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/markus90souza.png',
  )

  const toast = useToast()

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

          <Input
            bgColor={'gray.600'}
            marginBottom={4}
            value={'Marcos de Souza'}
          />
          <Input
            bgColor={'gray.600'}
            value={'markus90souza@gmail.com'}
            isDisabled
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

          <Input
            bgColor={'gray.600'}
            placeholder={'Senha antiga'}
            secureTextEntry
            marginBottom={4}
          />

          <Input
            bgColor={'gray.600'}
            placeholder={'Nova senha'}
            secureTextEntry
            marginBottom={4}
          />

          <Input
            bgColor={'gray.600'}
            placeholder={'Confirme nova senha'}
            secureTextEntry
            marginBottom={4}
          />

          <Button name={'Atualizar perfil'} />
        </Center>
      </ScrollView>
    </VStack>
  )
}

export { Profile }
