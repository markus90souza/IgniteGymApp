import { useCallback, useState } from 'react'
import { Heading, SectionList, Text, useToast, VStack } from 'native-base'
import { Header } from '@components/Header'
import { HistoryCard } from '@components/Cards/HistoryCard'
import { api } from '@services/api'
import { AppError } from '@utils/appError'
import { useFocusEffect } from '@react-navigation/native'
import { HistoryGroupByDayDTO } from '@dtos/HistoryDTO'

const History = () => {
  const [history, setHistory] = useState<HistoryGroupByDayDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  const getHistory = async () => {
    try {
      setIsLoading(true)
      const { data } = await api('/history')
      setHistory(data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possivel carregar historico de exercicios, tente novamente mais tarde!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }
  useFocusEffect(
    useCallback(() => {
      getHistory()
    }, []),
  )
  return (
    <VStack flex={1} bgColor={'gray.700'}>
      <Header title={'Histórico de Exercícios'} />

      <SectionList
        sections={history}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section }) => (
          <Heading
            color={'gray.200'}
            fontSize={'md'}
            marginTop={10}
            marginBottom={3}
          >
            {section.title}
          </Heading>
        )}
        renderItem={({ item }) => <HistoryCard data={item} />}
        contentContainerStyle={
          history.length === 0 && {
            flex: 1,
            justifyContent: 'center',
          }
        }
        ListEmptyComponent={() => (
          <Text textAlign={'center'} color={'gray.100'}>
            Não há exercicios registrados ainda. {'\n'} Vamos fazer exercicios
            hoje?
          </Text>
        )}
        paddingX={6}
      />
    </VStack>
  )
}

export { History }
