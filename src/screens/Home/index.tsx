import { useEffect, useState } from 'react'
import { FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base'
// NAVIGATION
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesApp } from '@routes/app.routes'
// COMPONENTS
import { HomeHeader } from '@components/HomeHeader'
import { Group } from '@components/Group'
import { ExerciseCard } from '@components/Cards/ExerciseCard'
import { AppError } from '@utils/appError'
import { api } from '@services/api'

const Home = () => {
  const [isSelectedGroup, setIsSelectedGroup] = useState('')
  const { navigate } = useNavigation<AppNavigatorRoutesApp>()

  const toast = useToast()

  const [groups, setGroups] = useState<string[]>([])

  const handleOpenExerciseDetails = () => {
    navigate('exercise')
  }

  const getGroups = async () => {
    try {
      const { data } = await api.get('/groups')
      setGroups(data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possivel carregar os grupos musculares, tente novamente mais tarde!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  useEffect(() => {
    getGroups()
  }, [])

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
        minHeight={10}
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
