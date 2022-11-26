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
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesApp } from '@routes/app.routes'

import { ArrowLeft } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'

import BodyIcon from '@assets/body.svg'
import SeriesIcon from '@assets/series.svg'
import RepetitionsIcon from '@assets/repetitions.svg'
import { Button } from '@components/Button'

const Exercise = () => {
  const { colors, sizes } = useTheme()
  const { goBack } = useNavigation<AppNavigatorRoutesApp>()

  const handleGoBack = () => {
    goBack()
  }

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
            {'Puxada frontal'}
          </Heading>

          <HStack>
            <BodyIcon />
            <Text color={'gray.200'} ml={1} textTransform={'capitalize'}>
              {'Costas'}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p={8}>
        <ScrollView>
          <Image
            w={'full'}
            h={80}
            source={{ uri: 'https://github.com/markus90souza.png' }}
            alt={'eueuue'}
            resizeMode={'cover'}
            rounded={'lg'}
            mb={3}
            overflow={'hidden'}
          />

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
                  3 Séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsIcon />
                <Text color={'gray.200'} ml={2}>
                  12 Repetições
                </Text>
              </HStack>
            </HStack>

            <Button name="Marcar como realizado" />
          </Box>
        </ScrollView>
      </VStack>
    </VStack>
  )
}

export { Exercise }
