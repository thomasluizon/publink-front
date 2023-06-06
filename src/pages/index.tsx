import Head from 'next/head'
import Link from 'next/link'
import ImagePost from '@/models/ImagePost'
import PostImage from '@/components/PostImage'

export default function Home() {
	const title = 'Publink'
	const alt = 'Imagem xuize'
	const postUrl = '#'

	const imageLinks: ImagePost[] = [
		new ImagePost('https://i.imgur.com/rC7z7KP.png', alt, 1),
		new ImagePost('https://i.imgur.com/UICTg9A.png', alt, 2),
		new ImagePost('https://i.imgur.com/wOmkBgy.png', alt, 3),
		new ImagePost('https://i.imgur.com/sk0Ev2e.png', alt, 4),
		new ImagePost('https://i.imgur.com/drozwAm.jpeg', alt, 5),
	]

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>
			<header className="flex p-5 justify-between container mx-auto">
				<h1 className="text-2xl text-center">{title}</h1>
				<div className="flex gap-5">
					<Link href="/register">Register</Link>
					<Link href="/login">Login</Link>
				</div>
			</header>
			<main className="container mx-auto p-5">
				<h2 className="text-3xl mb-5 ">Feed</h2>
				<div className="flex flex-wrap gap-5 justify-between">
					{imageLinks.map(img => (
						<PostImage img={img} key={img.url} />
					))}
				</div>
			</main>
		</>
	)
}
