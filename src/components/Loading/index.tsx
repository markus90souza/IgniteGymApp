import React from 'react'
import { Spinner, Center } from 'native-base'

const Loading = () => {
  return (
    <Center flex={1}>
      <Spinner />
    </Center>
  )
}

export { Loading }
