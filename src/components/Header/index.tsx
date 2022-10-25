import { Center, Heading } from 'native-base'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <Center bgColor={'gray.600'} paddingTop={16} paddingBottom={6}>
      <Heading color={'gray.100'} fontSize={'xl'}>
        {title}
      </Heading>
    </Center>
  )
}
