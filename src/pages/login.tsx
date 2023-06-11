import Button from '@/components/Button'
import Input from '@/components/Input'
import AuthContext from '@/context/AuthContext'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React, {
	FormEvent,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'

export default function Register(props: {
	correctLogin: InferGetServerSidePropsType<typeof getServerSideProps>
	correctPassword: InferGetServerSidePropsType<typeof getServerSideProps>
}) {
	const router = useRouter()

	// Refs
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	// States
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const { isLoggedIn, setLoggedIn } = useContext(AuthContext)

	// Functions
	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()

		if (!emailRef.current || !passwordRef.current) return

		const login = emailRef.current.value
		const password = passwordRef.current.value

		const correctLogin = props.correctLogin as unknown as string
		const correctPassword = props.correctPassword as unknown as string

		if (login !== correctLogin || password !== correctPassword) {
			setError(true)
			setErrorMessage('Email ou senha inválido(a).')

			emailRef.current.value = ''
			passwordRef.current.value = ''

			return
		}

		localStorage.setItem('isLoggedIn', 'true')
		setLoggedIn(true)
		setError(false)

		emailRef.current.value = ''
		passwordRef.current.value = ''

		router.push('/')
	}

	useEffect(() => {
		if (isLoggedIn) {
			router.push('/')
		}
	}, [isLoggedIn, router])

	return (
		<div className="h-3/4 flex justify-center items-center">
			<form
				className="flex flex-col max-w-xl mx-auto gap-5"
				onSubmit={handleSubmit}
			>
				<Input id="email" label="Email" ref={emailRef} type="email" />
				<Input
					id="password"
					label="Senha"
					ref={passwordRef}
					type="password"
				/>

				<Button>Login</Button>
				{error ? (
					<div className="text-red-600 border-2 p-3 rounded-xl border-red-600">
						{errorMessage}
					</div>
				) : (
					false
				)}
			</form>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps<{
	correctLogin: string | undefined
	correctPassword: string | undefined
}> = async context => {
	const login = process.env.LOGIN
	const password = process.env.PASSWORD

	return { props: { correctLogin: login, correctPassword: password } }
}
