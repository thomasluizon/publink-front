import Head from 'next/head'
import Link from 'next/link'
import ImagePost from '@/models/ImagePost'
import PostImage from '@/components/PostImage'
import ImageModel from '@/components/ImageModel'

export default function Home() {
	const alt = 'Imagem teste'
	const imageWidth = 300

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
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt),
	]

	return (
		<>
			<Head>
				<title>Publink - Feed</title>
			</Head>
			<div className="flex flex-wrap gap-5 justify-between items-center">
				<Link
					href="/post/create"
					className="mx-auto fixed bottom-5 left-1/2 -translate-x-1/2 hover:scale-105 transition-all z-10"
				>
					<ImageModel
						imgWidth={imageWidth / 4}
						imgAlt="Imagem de um símbolo de mais"
						imgUrl="/imgs/plus.png"
						roundedFull
					/>
				</Link>
				{imageLinks.map(img => (
					<PostImage imgWidth={imageWidth} img={img} key={img.url} />
				))}
			</div>
		</>
	)
}
