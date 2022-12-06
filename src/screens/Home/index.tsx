import { useCallback, useEffect, useState } from 'react'
import { FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base'
// NAVIGATION
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesApp } from '@routes/app.routes'
// COMPONENTS
import { HomeHeader } from '@components/HomeHeader'
import { Group } from '@components/Group'
import { ExerciseCard } from '@components/Cards/ExerciseCard'
import { AppError } from '@utils/appError'
import { api } from '@services/api'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Loading } from '@components/Loading'

const Home = () => {
  const { navigate } = useNavigation<AppNavigatorRoutesApp>()

  const toast = useToast()

  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [isSelectedGroup, setIsSelectedGroup] = useState('antebraço')
  const [isLoading, setIsLoading] = useState(true)

  const handleOpenExerciseDetails = () => {
    navigate('exercise')
  }

  const getGroups = async () => {
    try {
      const { data } = await api.get('/groups')
      setGroups(data)
      console.log(data)
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

  const getExercisesByGroup = async () => {
    try {
      setIsLoading(true)
      const { data } = await api(`/exercises/bygroup/${isSelectedGroup}`)
      setExercises(data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possivel carregar os exercicios, tente novamente mais tarde!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      getExercisesByGroup()
    }, [isSelectedGroup]),
  )

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

      {isLoading ? (
        <Loading />
      ) : (
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
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard data={item} onPress={handleOpenExerciseDetails} />
            )}
            _contentContainerStyle={{
              paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
          />
        </VStack>
      )}
    </VStack>
  )
}

export { Home }
