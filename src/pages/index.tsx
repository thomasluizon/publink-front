import Head from 'next/head'
import Link from 'next/link'
import ImagePost from '@/models/ImagePost'
import PostImage from '@/components/PostImage'

export default function Home() {
	const alt = 'Imagem teste'
	const postUrl = '#'

	const imageLinks: ImagePost[] = [
		new ImagePost('https://i.imgur.com/rC7z7KP.png', alt),
		new ImagePost('https://i.imgur.com/UICTg9A.png', alt),
		new ImagePost('https://i.imgur.com/wOmkBgy.png', alt),
		new ImagePost('https://i.imgur.com/sk0Ev2e.png', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
	]

	return (
		<>
			<Head>
				<title>Publink</title>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>
			<h2 className="text-3xl mb-5">Feed</h2>
			<div className="flex flex-wrap gap-5 justify-between">
				{imageLinks.map(img => (
					<PostImage img={img} key={img.url} />
				))}
			</div>
		</>
	)
}
