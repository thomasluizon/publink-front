import { useRouter } from 'next/router'

export default function Post() {
	const id = useRouter().query.id

	return <div>{id}</div>
}
