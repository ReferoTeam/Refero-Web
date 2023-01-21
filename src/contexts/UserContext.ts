import { createContext, useContext } from 'react'
import { User } from '../types'

export type UserContextType = {
  userData?: User,
  setUserData: (User: User) => void;
}

export const UserContext = createContext<UserContextType>({ userData: undefined, setUserData: userData => console.warn('no user data found')});
export const useUserContext = () => useContext(UserContext);