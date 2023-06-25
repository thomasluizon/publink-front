import IUser from '@/interfaces/IUser'
import { createContext, useState } from 'react'

type AuthContextType = {
	isLoggedIn: boolean
	setLoggedIn: (value: boolean) => void
	user: IUser
	setUser: (user: IUser) => void
}

const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	setLoggedIn: () => {},
	user: {},
	setUser: () => {},
})

export default AuthContext
