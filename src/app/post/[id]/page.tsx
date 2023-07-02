import { Metadata } from 'next'
import Post from './Post'

type Params = {
	params: { id: string }
}

export const metadata: Metadata = {
	title: 'Publink - Post',
}

export default function Page({ params }: Params) {
	return <Post id={params.id} />
}
