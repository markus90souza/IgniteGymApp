import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base'
import { Header } from '@components/Header'
import { UserPhoto } from '@components/UserPhoto'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

const Profile = () => {
  // eslint-disable-next-line no-unused-vars
  const [photoIsLoading, setphotoIsLoading] = useState(false)
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
              source={{ uri: 'https://github.com/markus90souza.png' }}
              alt={'Minha foto'}
              size={33}
            />
          )}

          <TouchableOpacity>
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
