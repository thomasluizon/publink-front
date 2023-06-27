import Button from '@/components/Button'
import ErrorBox from '@/components/ErrorBox'
import Input from '@/components/Input'
import Loader from '@/components/Loader'
import SuccessBox from '@/components/SuccessBox'
import AuthContext from '@/context/AuthContext'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useRef, useState } from 'react'

export default function Register({
	apiUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter()

	// Refs
	const emailRef = useRef<HTMLInputElement>(null)
	const usernameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	// States
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	// Functions
	const setGeneralRegisterError = (message?: string) => {
		if (!emailRef.current || !passwordRef.current || !usernameRef.current)
			return

		setError(true)
		setErrorMessage(message || 'Email ou senha inválido(a).')

		usernameRef.current.value = ''
		emailRef.current.value = ''
		passwordRef.current.value = ''
	}

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()

		if (!passwordRef.current || !emailRef.current || !usernameRef.current)
			return

		const username = usernameRef.current.value
		const email = emailRef.current.value
		const password = passwordRef.current.value

		if (username === '' || email === '' || password === '') {
			setGeneralRegisterError(
				'Insira um nome de usuário, um login e uma senha válida'
			)
		}

		const url = `${apiUrl}/Auth/Register`

		const payload = {
			username,
			email,
			password,
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

			if (res.status === 400) {
				setGeneralRegisterError('Usuário já registrado')
				return
			}

			if (!res.ok) {
				setGeneralRegisterError(serverError)
				return
			}

			setIsSuccess(true)
			setIsLoading(true)
			setError(false)

			setTimeout(() => {
				router.push('/login')
			}, 3000)
		} catch (error) {
			setGeneralRegisterError(serverError)
		}
	}

	return (
		<div className="h-3/4 flex justify-center items-center">
			<form
				className="flex flex-col max-w-xl mx-auto gap-5"
				onSubmit={handleSubmit}
			>
				<Input id="username" label="Nome" ref={usernameRef} type="text" />
				<Input id="email" label="Email" ref={emailRef} type="email" />
				<Input
					id="password"
					label="Senha"
					ref={passwordRef}
					type="password"
				/>

				<Button>Registrar</Button>

				{isLoading ? <Loader /> : false}

				{isSuccess ? (
					<SuccessBox>
						Registrado com sucesso! Você será redirecionado para a tela de
						login.
					</SuccessBox>
				) : (
					false
				)}

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
