import { Metadata } from 'next'
import Create from './Create'

export const metadata: Metadata = {
	title: 'Publink - Criar publicação',
}

export default function Page() {
	return <Create />
}
