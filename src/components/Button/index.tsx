import { Button as NBButton, IButtonProps, Text } from 'native-base'

type ButtonProps = IButtonProps & {
  name: string
  variant?: 'solid' | 'outline'
}

const Button = ({ name, variant = 'solid', ...rest }: ButtonProps) => {
  return (
    <NBButton
      w={'full'}
      h={14}
      bgColor={variant === 'outline' ? 'transparent' : 'green.700'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor={variant === 'outline' ? 'green.500' : ''}
      rounded={'sm'}
      _pressed={{
        bgColor: variant === 'outline' ? 'gray.500' : 'green.500',
      }}
      {...rest}
    >
      <Text
        color={variant === 'outline' ? 'green.500' : 'white'}
        fontFamily={'heading'}
        fontSize={'sm'}
      >
        {name}
      </Text>
    </NBButton>
  )
}

export { Button }
