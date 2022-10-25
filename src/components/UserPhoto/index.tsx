import { Image, IImageProps } from 'native-base'

type Props = IImageProps & {
  size: number
}

export function UserPhoto({ size, alt, ...rest }: Props) {
  return (
    <Image
      w={size}
      h={size}
      alt={alt}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  )
}
