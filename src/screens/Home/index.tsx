import { useState } from 'react'
import { FlatList, Heading, HStack, Text, VStack } from 'native-base'
import { HomeHeader } from '@components/HomeHeader'
import { Group } from '@components/Group'
import { ExerciseCard } from '@components/Cards/ExerciseCard'

const Home = () => {
  const [isSelectedGroup, setIsSelectedGroup] = useState('')

  const [groups, setGroups] = useState([
    'costas',
    'ombros',
    'bicips',
    'tricips',
  ])
  return (
    <VStack flex={1} bgColor={'gray.700'}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <Group
            key={index}
            name={item}
            isActive={isSelectedGroup === item}
            onPress={() => setIsSelectedGroup(item)}
            mr={3}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          paddingX: 8,
        }}
        my={10}
        marginRight={3}
        maxHeight={10}
      />

      <VStack flex={1} paddingX={8}>
        <HStack justifyContent={'space-between'} marginBottom={5}>
          <Heading fontSize={'md'} color={'gray.200'}>
            Exercicios
          </Heading>
          <Text fontSize={'sm'} color={'gray.200'}>
            4
          </Text>
        </HStack>

        <FlatList
          data={['1', '2', '3', '4', '5', '6']}
          renderItem={() => <ExerciseCard />}
        />
      </VStack>
    </VStack>
  )
}

export { Home }
