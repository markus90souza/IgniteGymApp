import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'

type AuthRoutesProps = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigatorRoutesProps =
  NativeStackNavigationProp<AuthRoutesProps>

const { Group, Navigator, Screen } =
  createNativeStackNavigator<AuthRoutesProps>()

const AuthRoutes = () => {
  return (
    <Navigator>
      <Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name={'signIn'} component={SignIn} />
        <Screen name={'signUp'} component={SignUp} />
      </Group>
    </Navigator>
  )
}

export { AuthRoutes }
