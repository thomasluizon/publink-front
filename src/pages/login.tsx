import Button from '@/components/Button'
import Input from '@/components/Input'
import AuthContext from '@/context/AuthContext'
import IUser from '@/interfaces/IUser'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import loginFunction from '@/helpers/loginFunction'
import Loader from '@/components/Loader'
import ErrorBox from '@/components/ErrorBox'

export default function Register({
	apiUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter()

	// Refs
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	// States
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const { isLoggedIn, setLoggedIn, setUser } = useContext(AuthContext)

	// Functions
	const setGeneralLoginError = (message?: string) => {
		if (!emailRef.current || !passwordRef.current) return

		setError(true)
		setErrorMessage(message || 'Email ou senha inválido(a).')

		emailRef.current.value = ''
		passwordRef.current.value = ''
	}

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()

		if (!emailRef.current || !passwordRef.current) return

		const url = `${apiUrl}/Auth/Authenticate`

		const login = emailRef.current.value
		const password = passwordRef.current.value

		if (login === '' || password === '') {
			setError(true)
			setErrorMessage('Insira um login e uma senha válida')
			return
		}

		const payload = {
			email: login,
			password: password,
		}

		setIsLoading(true)

		const serverError = 'Erro no servidor - Tente novamente mais tarde.'

		try {
			const res = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: {
					'Content-type': 'application/json',
					Accept: 'application/json',
				},
			})

			setIsLoading(false)

			if (res.status == 404) {
				setGeneralLoginError()
				return
			}

			if (!res.ok) {
				setGeneralLoginError(serverError)
				return
			}

			const json = await res.json()

			const loginResponse = json as ILoginResponse

			const user: IUser = {
				id: localStorage.getItem('id') as string,
				username: localStorage.getItem('username') as string,
			}

			loginFunction(
				loginResponse.token,
				loginResponse.user.username as string,
				loginResponse.user.id as string,
				setLoggedIn,
				setUser,
				user
			)

			setError(false)

			emailRef.current.value = ''
			passwordRef.current.value = ''

			router.push('/')
		} catch (error) {
			setIsLoading(false)
			setGeneralLoginError(serverError)
		}
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

				<Button disabled={isLoading}>Login</Button>

				{isLoading ? <Loader /> : false}

				{error ? <ErrorBox>{errorMessage}</ErrorBox> : false}
			</form>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps<{
	apiUrl: string
}> = async context => {
	const apiUrl = process.env.API_URL as string

	return { props: { apiUrl } }
}

// Interfaces
interface ILoginResponse {
	token: string
	user: IUser
}
