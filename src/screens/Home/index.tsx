import { useState } from 'react'
import { FlatList, Heading, HStack, Text, VStack } from 'native-base'
import { HomeHeader } from '@components/HomeHeader'
import { Group } from '@components/Group'
import { ExerciseCard } from '@components/Cards/ExerciseCard'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesApp } from '@routes/app.routes'

const Home = () => {
  const [isSelectedGroup, setIsSelectedGroup] = useState('')
  const { navigate } = useNavigation<AppNavigatorRoutesApp>()
  // eslint-disable-next-line no-unused-vars
  const [groups, setGroups] = useState([
    'costas',
    'ombros',
    'bicips',
    'tricips',
  ])

  const handleOpenExerciseDetails = () => {
    navigate('exercise')
  }

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
            isActive={
              isSelectedGroup.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
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
          renderItem={() => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </VStack>
  )
}

export { Home }
