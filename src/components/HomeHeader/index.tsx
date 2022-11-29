import { HStack, VStack, Text, Heading, Icon, useTheme } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { SignOut } from 'phosphor-react-native'
import { useAuth } from '@hooks/useAuth'
import { UserPhoto } from '@components/UserPhoto'

import userDefaultPhoto from '@assets/userPhotoDefault.png'

export const HomeHeader = () => {
  const { colors, sizes } = useTheme()

  const { user, signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
  }

  return (
    <HStack px={8} pt={10} pb={5} bgColor={'gray.600'} alignItems={'center'}>
      <UserPhoto
        source={user.avatar ? { uri: user.avatar } : userDefaultPhoto}
        size={16}
        alt="Imagem do usuário"
        mr={4}
        resizeMode={'contain'}
      />
      <VStack flex={1}>
        <Text color={'gray.100'} fontSize={'md'}>
          Olá,
        </Text>
        <Heading color={'gray.100'} fontSize={'md'}>
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={handleSignOut}>
        <Icon as={<SignOut color={colors.gray[200]} size={sizes[7]} />} />
      </TouchableOpacity>
    </HStack>
  )
}
