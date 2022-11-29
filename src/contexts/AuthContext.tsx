import { createContext, ReactNode, useEffect, useState } from 'react'
import { UserDTO } from '@dtos/UserDTO'
import { api } from '@services/api'
import {
  getUserStorage,
  saveUserStorage,
  removeUserStorage,
} from '@storage/storageUser'

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
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

  const signIn = async (email: string, password: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      })

      if (data.user) {
        setUser(data.user)
        saveUserStorage(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    try {
      setIsloadingUserStorage(true)
      setUser({} as UserDTO)
      await removeUserStorage()
    } catch (error) {
      throw error
    } finally {
      setIsloadingUserStorage(false)
    }
  }

  const getUserStorageData = async () => {
    try {
      const userLogged = await getUserStorage()

      if (userLogged) {
        setUser(userLogged)
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
      value={{ user, signIn, signOut, isloadingUserStorage }}
    >
      {children}
    </AuthContext.Provider>
  )
}
