import { Input as NBInput, IInputProps } from 'native-base'

type InputProps = IInputProps & {}

const Input = ({ ...rest }: InputProps) => {
  return (
    <NBInput
      bgColor={'gray.700'}
      rounded={'sm'}
      w={'full'}
      h={14}
      px={4}
      borderWidth={0}
      color={'white'}
      fontSize={'md'}
      fontFamily={'body'}
      placeholderTextColor={'gray.300'}
      _focus={{
        bgColor: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...rest}
    />
  )
}

export { Input }
