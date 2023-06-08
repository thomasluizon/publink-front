import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'

export default function App({ Component, pageProps }: AppProps) {
	const title = 'Publink'

	return (
		<>
			<header className="flex p-5 justify-between container mx-auto">
				<h1 className="text-2xl text-center">
					<Link href="/">{title}</Link>
				</h1>
				<div className="flex gap-5">
					<Link href="/register">Register</Link>
					<Link href="/login">Login</Link>
				</div>
			</header>
			<main className="container mx-auto px-5">
				<Component {...pageProps} />
			</main>
			<footer className="bg-black py-20 mt-6">
				<p className="text-center text-xl text-white">{title}</p>
			</footer>
		</>
	)
}
