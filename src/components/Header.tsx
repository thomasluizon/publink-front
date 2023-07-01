import Link from 'next/link'
import ImageModel from './ImageModel'

type Props = {
	isLoggedIn: boolean
	username: string | undefined
	handleLogout: () => void
}

export default function Header({ isLoggedIn, username, handleLogout }: Props) {
	return (
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
					<>
						<span>Olá, {username || 'User'}</span>
						<button onClick={handleLogout}>Sair</button>
					</>
				)}
			</div>
		</header>
	)
}
