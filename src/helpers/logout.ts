import { NextRouter } from 'next/router'

export default function logout(
	router: NextRouter,
	setLoggedIn: (value: boolean) => void
) {
	localStorage.removeItem('token')
	localStorage.removeItem('id')
	localStorage.removeItem('username')
	setLoggedIn(false)
	router.push('/login')
}
