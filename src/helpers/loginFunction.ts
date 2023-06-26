import IUser from '@/interfaces/IUser'

export default function loginFunction(
	token: string,
	username: string,
	id: string,
	setLoggedIn: (value: boolean) => void,
	setUser: (value: IUser) => void,
	user: IUser
) {
	localStorage.setItem('token', token)
	localStorage.setItem('username', username)
	localStorage.setItem('id', id)
	setLoggedIn(true)
	setUser(user)
}
