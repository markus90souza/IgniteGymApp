import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'

import { History } from '@screens/History'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'
import { Exercise } from '@screens/Exercise'

import HomeIcon from '@assets/home.svg'
import HistoryIcon from '@assets/history.svg'
import ProfileIcon from '@assets/profile.svg'
import { useTheme } from 'native-base'
import { Platform } from 'react-native'

type AppRoutesProps = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: undefined
}

export type AppNavigatorRoutesApp = BottomTabNavigationProp<AppRoutesProps>
const { Group, Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>()

const AppRoutes = () => {
  const { sizes, colors } = useTheme()

  const iconSize = sizes[6]

  return (
    <Navigator>
      <Group
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.green[500],
          tabBarInactiveTintColor: colors.gray[200],
          tabBarStyle: {
            backgroundColor: colors.gray[600],
            borderTopWidth: 0,
            height: Platform.OS === 'android' ? 'auto' : 96,
            paddingTop: sizes[6],
            paddingBottom: sizes[10],
          },
        }}
      >
        <Screen
          name={'home'}
          component={Home}
          options={{
            tabBarIcon: ({ color }) => {
              return (
                <HomeIcon fill={color} width={iconSize} height={iconSize} />
              )
            },
          }}
        />
        <Screen
          name={'history'}
          component={History}
          options={{
            tabBarIcon: ({ color }) => {
              return (
                <HistoryIcon fill={color} width={iconSize} height={iconSize} />
              )
            },
          }}
        />
        <Screen
          name={'profile'}
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => {
              return (
                <ProfileIcon fill={color} width={iconSize} height={iconSize} />
              )
            },
          }}
        />
        <Screen
          name={'exercise'}
          component={Exercise}
          options={{
            tabBarButton: () => null,
          }}
        />
      </Group>
    </Navigator>
  )
}

export { AppRoutes }
