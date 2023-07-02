import { Metadata } from 'next'
import Login from './Login'

export const metadata: Metadata = {
	title: 'Publink - Login',
}

export default function Page() {
	return <Login />
}
