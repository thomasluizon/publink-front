'use client'

import AuthContext from '@/context/AuthContext'
import { User } from '@/types/User'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

const useAuth = () => {
	const router = useRouter()

	// States
	const { setLoggedIn, setUser } = useContext(AuthContext)

	useEffect(() => {
		const token = localStorage.getItem('token')

		if (!token) {
			setLoggedIn(false)
			router.push('/login')
			return
		}

		const user: User = {
			id: localStorage.getItem('id') as string,
			username: localStorage.getItem('username') as string,
		}

		setLoggedIn(true)
		setUser(user)
	}, [router, setLoggedIn, setUser])
}

export default useAuth
