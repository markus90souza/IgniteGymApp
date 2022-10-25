import { UserPhoto } from '@components/UserPhoto'
import { HStack, VStack, Text, Heading, Icon, useTheme } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { SignOut } from 'phosphor-react-native'

export const HomeHeader = () => {
  const { colors, sizes } = useTheme()
  return (
    <HStack px={8} pt={10} pb={5} bgColor={'gray.600'} alignItems={'center'}>
      <UserPhoto
        source={{ uri: 'https://github.com/markus90souza.png' }}
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
          Marcos de souza
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={<SignOut color={colors.gray[200]} size={sizes[7]} />} />
      </TouchableOpacity>
    </HStack>
  )
}
