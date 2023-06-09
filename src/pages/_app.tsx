import ImageModel from '@/components/ImageModel'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'

export default function App({ Component, pageProps }: AppProps) {
	const title = 'Publink'

	return (
		<>
			<Head>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<link rel="icon" href="/imgs/favicon.png" />
				<title>{title}</title>
			</Head>
			<header className="flex p-5 justify-between items-center container mx-auto">
				<div className="flex items-center">
					<Link href="/">
						<ImageModel
							imgUrl="/imgs/logo.png"
							imgAlt="Logo"
							imgWidth={150}
						/>
					</Link>
				</div>
				<div className="flex gap-5">
					<Link href="/">Register</Link>
					<Link href="/">Login</Link>
				</div>
			</header>
			<main className="container mx-auto px-5 pb-10">
				<Component {...pageProps} />
			</main>
		</>
	)
}
