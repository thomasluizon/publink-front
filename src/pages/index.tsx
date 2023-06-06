import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import ImagePost from '@/models/ImagePost'
import Post from '@/components/Post'

export default function Home() {
	const title = 'Publink'
	const imgUrl = 'Imagem xuize'
	const postUrl = '#'

	const imageLinks: ImagePost[] = [
		new ImagePost('https://i.imgur.com/rC7z7KP.png', imgUrl, postUrl),
		new ImagePost('https://i.imgur.com/UICTg9A.png', imgUrl, postUrl),
		new ImagePost('https://i.imgur.com/wOmkBgy.png', imgUrl, postUrl),
		new ImagePost('https://i.imgur.com/sk0Ev2e.png', imgUrl, postUrl),
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
				<h2 className="text-3xl">Feed</h2>

				<div className="flex flex-wrap gap-5 justify-between">
					{imageLinks.map(img => (
						<Post img={img} key={img.url} />
					))}
				</div>
			</main>
		</>
	)
}
