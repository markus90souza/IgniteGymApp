import {
  VStack,
  Icon,
  useTheme,
  HStack,
  Heading,
  Text,
  Image,
  Box,
  ScrollView,
  useToast,
} from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesApp } from '@routes/app.routes'

import { ArrowLeft } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'

import BodyIcon from '@assets/body.svg'
import SeriesIcon from '@assets/series.svg'
import RepetitionsIcon from '@assets/repetitions.svg'
import { Button } from '@components/Button'
import { AppError } from '@utils/appError'
import { api } from '@services/api'
import { useEffect, useState } from 'react'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Loading } from '@components/Loading'

type IParams = {
  exerciseId: string
}

const Exercise = () => {
  const { colors, sizes } = useTheme()
  const toast = useToast()
  const { goBack, navigate } = useNavigation<AppNavigatorRoutesApp>()
  const { params } = useRoute()
  const { exerciseId } = params as IParams
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const [isLoading, setIsLoading] = useState(true)
  const [sendingRegisterHistory, setSendingRegisterHistory] = useState(false)

  const handleGoBack = () => {
    goBack()
  }

  const getExercisesById = async () => {
    try {
      setIsLoading(true)
      const { data } = await api(`/exercises/${exerciseId}`)
      setExercise(data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possivel carregar os exercicios pelo id, tente novamente mais tarde!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExerciseHistoryAdd = async () => {
    try {
      setSendingRegisterHistory(true)

      await api.post('/history', { exercise_id: exerciseId })

      toast.show({
        title: 'Parabéns, exercicio adicionando ao seu historico',
        placement: 'top',
        bgColor: 'green.500',
      })

      navigate('history')
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possivel carregar os exercicios pelo id, tente novamente mais tarde!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setSendingRegisterHistory(false)
    }
  }

  useEffect(() => {
    getExercisesById()
  }, [exerciseId])

  return (
    <VStack flex={1} bg={'gray.700'}>
      <VStack paddingX={8} paddingTop={12} bgColor={'gray.600'}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            as={
              <ArrowLeft
                color={colors.green[500]}
                size={sizes[6]}
                weight="thin"
              />
            }
          />
        </TouchableOpacity>

        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          mt={4}
          mb={8}
        >
          <Heading color={'gray.100'} fontSize={'lg'} flexShrink={1}>
            {exercise.name}
          </Heading>

          <HStack>
            <BodyIcon />
            <Text color={'gray.200'} ml={1} textTransform={'capitalize'}>
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <VStack p={8}>
          <ScrollView>
            <Box mb={3} overflow="hidden" rounded={'lg'}>
              <Image
                w={'full'}
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt={exercise.name}
                resizeMode={'cover'}
              />
            </Box>

            <Box bg={'gray.600'} rounded={'lg'} pb={4} px={4}>
              <HStack
                mt={5}
                mb={6}
                justifyContent={'space-around'}
                alignItems={'center'}
              >
                <HStack>
                  <SeriesIcon />
                  <Text color={'gray.200'} ml={2}>
                    {exercise.series} Séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsIcon />
                  <Text color={'gray.200'} ml={2}>
                    {exercise.repetitions} Repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                name="Marcar como realizado"
                onPress={handleExerciseHistoryAdd}
                isLoading={sendingRegisterHistory}
              />
            </Box>
          </ScrollView>
        </VStack>
      )}
    </VStack>
  )
}

export { Exercise }
