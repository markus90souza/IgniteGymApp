import { useState } from 'react'
import { Heading, SectionList, Text, VStack } from 'native-base'
import { Header } from '@components/Header'
import { HistoryCard } from '@components/Cards/HistoryCard'

const History = () => {
  // eslint-disable-next-line no-unused-vars
  const [exercises, setexercises] = useState([
    { title: '02.09.2022', data: ['Puxado frontal', 'Remada unilateral'] },
    { title: '03.09.2022', data: ['Puxado frontal', 'Remada unilateral'] },
    { title: '03.09.2022', data: ['Puxado frontal', 'Remada unilateral'] },
    { title: '03.09.2022', data: ['Puxado frontal', 'Remada unilateral'] },
    { title: '03.09.2022', data: ['Puxado frontal', 'Remada unilateral'] },
    { title: '03.09.2022', data: ['Puxado frontal', 'Remada unilateral'] },
  ])
  return (
    <VStack flex={1} bgColor={'gray.700'}>
      <Header title={'Histórico de Exercícios'} />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
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
        renderItem={({ item }) => <HistoryCard />}
        contentContainerStyle={
          exercises.length === 0 && {
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
