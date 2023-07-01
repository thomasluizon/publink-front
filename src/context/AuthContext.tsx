import { User } from '@/types/User'
import { createContext } from 'react'

type AuthContextType = {
	isLoggedIn: boolean
	setLoggedIn: (value: boolean) => void
	user: User
	setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	setLoggedIn: () => {},
	user: {},
	setUser: () => {},
})

export default AuthContext
