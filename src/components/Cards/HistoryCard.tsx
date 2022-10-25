import React from 'react'
import { Heading, HStack, Text, VStack } from 'native-base'

export function HistoryCard() {
  return (
    <HStack
      w={'full'}
      paddingX={5}
      paddingY={4}
      marginBottom={3}
      bgColor={'gray.600'}
      rounded={'md'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <VStack marginRight={5}>
        <Heading color={'white'} fontSize={'md'} textTransform={'capitalize'}>
          {'Costas'}
        </Heading>
        <Text color={'gray.100'} fontSize={'lg'} numberOfLines={1}>
          {'Puxada lateral'}
        </Text>
      </VStack>
      <Text color={'gray.300'} fontSize={'md'}>
        {'08:00'}
      </Text>
    </HStack>
  )
}
