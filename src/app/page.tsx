import { Metadata } from 'next'
import Home from './Home'

export const metadata: Metadata = {
	title: 'Publink - Feed',
}

export default function Page() {
	return <Home />
}
