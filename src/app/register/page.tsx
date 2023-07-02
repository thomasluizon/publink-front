import { Metadata } from 'next'
import Register from './Register'

export const metadata: Metadata = {
	title: 'Publink - Criar conta',
}

export default function Page() {
	return <Register />
}
