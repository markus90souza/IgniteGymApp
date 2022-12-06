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
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { api } from '@services/api'

type ExerciseCardProps = TouchableOpacityProps & {
  data: ExerciseDTO
}

export function ExerciseCard({ data, ...rest }: ExerciseCardProps) {
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
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt="uuuu"
          w={16}
          h={16}
          rounded={'md'}
          mr={4}
          resizeMode={'cover'}
        />

        <VStack flex={1}>
          <Heading fontSize={'lg'} color={'white'}>
            {data.name}
          </Heading>
          <Text
            fontSize={'sm'}
            color={'gray.200'}
            marginTop={1}
            numberOfLines={2}
          >
            {data.series}x séries x {data.repetitions} repetições
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
