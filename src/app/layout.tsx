'use client'

import Header from '@/components/Header'
import AuthContext from '@/context/AuthContext'
import logout from '@/helpers/logout'
import { User } from '@/types/User'
import '@/styles/globals.css'
import { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const title = 'Publink'

export const metadata: Metadata = {
	title: `${title} - Feed`,
	description: 'Bem vindo ao publink',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()

	const [isLoggedIn, setLoggedIn] = useState(false)
	const [user, setUser] = useState<User>({})

	const handleLogout = () => {
		logout(router, setLoggedIn)
		router.push('/login')
	}

	return (
		<html lang="pt-br">
			<AuthContext.Provider
				value={{ isLoggedIn, setLoggedIn, user, setUser }}
			>
				<body>
					<Header
						isLoggedIn={isLoggedIn}
						username={user.username}
						handleLogout={handleLogout}
					/>
					<main className="container mx-auto px-5 pb-10 h-3/4">
						{children}
					</main>
				</body>
			</AuthContext.Provider>
		</html>
	)
}
