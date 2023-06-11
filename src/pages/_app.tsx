import ImageModel from '@/components/ImageModel'
import AuthContext from '@/context/AuthContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()

	const [isLoggedIn, setLoggedIn] = useState(true)

	useEffect(() => {
		const storedLoggedIn = localStorage.getItem('isLoggedIn')

		if (!storedLoggedIn) {
			setLoggedIn(false)
		}
	}, [])

	const title = 'Publink'

	const handleLogout = () => {
		localStorage.removeItem('isLoggedIn')
		setLoggedIn(false)
		router.push('/login')
	}

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
			<AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
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
						{!isLoggedIn ? (
							<>
								<Link href="/register">Criar conta</Link>
								<Link href="/login">Login</Link>
							</>
						) : (
							<button onClick={handleLogout}>Sair</button>
						)}
					</div>
				</header>
				<main className="container mx-auto px-5 pb-10 h-3/4">
					<Component {...pageProps} />
				</main>
			</AuthContext.Provider>
		</>
	)
}
