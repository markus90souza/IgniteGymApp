import React from 'react'
import {
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useTheme,
  VStack,
} from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { CaretRight } from 'phosphor-react-native'

type ExerciseCardProps = TouchableOpacityProps & {}

export function ExerciseCard({ ...rest }: ExerciseCardProps) {
  const { colors, sizes } = useTheme()
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bgColor={'gray.500'}
        padding={2}
        paddingRight={4}
        alignItems={'center'}
        rounded={'md'}
        mb={3}
      >
        <Image
          source={{ uri: 'https://github.com/markus90souza.png' }}
          alt="uuuu"
          w={16}
          h={16}
          rounded={'md'}
          mr={4}
          resizeMode={'center'}
        />

        <VStack flex={1}>
          <Heading fontSize={'lg'} color={'white'}>
            {'Remada lateral'}
          </Heading>
          <Text
            fontSize={'sm'}
            color={'gray.200'}
            marginTop={1}
            numberOfLines={2}
          >
            {'3x séries x 12 repetições'}
          </Text>
        </VStack>

        <Icon
          as={
            <CaretRight
              weight={'thin'}
              color={colors.gray[300]}
              size={sizes[6]}
            />
          }
        />
      </HStack>
    </TouchableOpacity>
  )
}
