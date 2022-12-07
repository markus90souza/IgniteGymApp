import { createContext, ReactNode, useEffect, useState } from 'react'
import { UserDTO } from '@dtos/UserDTO'
import { api } from '@services/api'
import {
  getUserStorage,
  saveUserStorage,
  removeUserStorage,
} from '@storage/storageUser'
import {
  saveTokenStorage,
  getTokenStorage,
  removeTokenStorage,
} from '@storage/storageAuthToken'

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updateUser: UserDTO) => void
  isloadingUserStorage: boolean
}

// CRIA O CONTEXTO
export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  const [isloadingUserStorage, setIsloadingUserStorage] = useState(true)

  const updateUserAndTokenStorage = async (user: UserDTO, token: string) => {
    try {
      setIsloadingUserStorage(true)
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      setUser(user)
    } catch (error) {
      throw error
    } finally {
      setIsloadingUserStorage(false)
    }
  }

  const saveUserAndTokenStorage = async (user: UserDTO, token: string) => {
    try {
      setIsloadingUserStorage(true)
      await saveUserStorage(user)
      await saveTokenStorage(token)
    } catch (error) {
      throw error
    } finally {
      setIsloadingUserStorage(false)
    }
  }

  const updateProfile = async (updateUser: UserDTO) => {
    try {
      setUser(updateUser)
      await saveUserStorage(updateUser)
    } catch (error) {
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      })

      if (data.user && data.token) {
        setIsloadingUserStorage(true)

        await saveUserAndTokenStorage(data.user, data.token)
        await updateUserAndTokenStorage(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsloadingUserStorage(false)
    }
  }

  const signOut = async () => {
    try {
      setIsloadingUserStorage(true)
      setUser({} as UserDTO)
      await removeUserStorage()
      await removeTokenStorage()
    } catch (error) {
      throw error
    } finally {
      setIsloadingUserStorage(false)
    }
  }

  const getUserStorageData = async () => {
    try {
      setIsloadingUserStorage(true)
      const userLogged = await getUserStorage()

      const token = await getTokenStorage()

      if (token && userLogged) {
        await updateUserAndTokenStorage(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsloadingUserStorage(false)
    }
  }

  useEffect(() => {
    getUserStorageData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isloadingUserStorage, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}
