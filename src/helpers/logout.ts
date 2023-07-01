import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

export default function logout(
	router: AppRouterInstance,
	setLoggedIn: (value: boolean) => void
) {
	localStorage.removeItem('token')
	localStorage.removeItem('id')
	localStorage.removeItem('username')
	setLoggedIn(false)
	router.push('/login')
}
