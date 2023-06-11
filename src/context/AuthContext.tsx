import { createContext, useState } from 'react'

type AuthContextType = {
	isLoggedIn: boolean
	setLoggedIn: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	setLoggedIn: () => {},
})

export default AuthContext
