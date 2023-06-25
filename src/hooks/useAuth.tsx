import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import AuthContext from '@/context/AuthContext'
import IUser from '@/interfaces/IUser'

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

		const user: IUser = {
			id: localStorage.getItem('id') as string,
			username: localStorage.getItem('username') as string,
		}

		setLoggedIn(true)
		setUser(user)
	}, [router, setLoggedIn, setUser])

	return null
}

export default useAuth
