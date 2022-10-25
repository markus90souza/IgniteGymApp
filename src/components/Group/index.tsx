import { Pressable, Text, IPressableProps } from 'native-base'

type GroupProps = IPressableProps & {
  name: string
  isActive: boolean
}

export const Group = ({ name, isActive, ...rest }: GroupProps) => {
  return (
    <Pressable
      w={24}
      h={10}
      bgColor={'gray.600'}
      rounded={'md'}
      overflow={'hidden'}
      justifyContent={'center'}
      alignItems={'center'}
      isPressed={isActive}
      _pressed={{
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...rest}
    >
      <Text
        fontSize={'xs'}
        fontWeight={'bold'}
        textTransform={'uppercase'}
        color={isActive ? 'green.500' : 'gray.200'}
      >
        {name}
      </Text>
    </Pressable>
  )
}
