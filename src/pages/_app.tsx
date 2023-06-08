import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<header className="flex p-5 justify-between container mx-auto">
				<h1 className="text-2xl text-center">
					<Link href="/">Publink</Link>
				</h1>
				<div className="flex gap-5">
					<Link href="/register">Register</Link>
					<Link href="/login">Login</Link>
				</div>
			</header>
			<main className="container mx-auto px-5">
				<Component {...pageProps} />
			</main>
		</>
	)
}
