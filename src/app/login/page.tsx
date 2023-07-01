'use client'

import Button from '@/components/Button'
import ErrorBox from '@/components/ErrorBox'
import Input from '@/components/Input'
import Loader from '@/components/Loader'
import AuthContext from '@/context/AuthContext'
import loginFunction from '@/helpers/loginFunction'
import { BaseResponse } from '@/types/BaseResponse'
import { User } from '@/types/User'
import { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import { FormEvent, useContext, useRef, useState } from 'react'

export const metadata: Metadata = {
	title: 'Publink - Login',
}

type LoginResponse = {
	token: string
	user: User
}

async function login(payload: {
	email: string
	password: string
}): Promise<BaseResponse<LoginResponse>> {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	const url = `${apiUrl}/Auth/Authenticate`

	const res = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
		},
	})

	if (res.status === 404) {
		return {
			error: 'notFound',
		}
	}

	if (!res.ok) {
		return {
			error: 'server',
		}
	}

	const xuize = await res.json()
	console.log(xuize)
	return {
		data: await res.json(),
	}
}

export default function Login() {
	const router = useRouter()
	const { isLoggedIn, setLoggedIn, setUser } = useContext(AuthContext)

	// Refs
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	// States
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	if (isLoggedIn) {
		router.push('/')
		return
	}

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

		const email = emailRef.current.value
		const password = passwordRef.current.value

		if (email === '' || password === '') {
			setGeneralLoginError('Insira um login e uma senha válida')
			return
		}

		const payload = {
			email,
			password,
		}

		setIsLoading(true)

		const serverError = 'Erro no servidor - Tente novamente mais tarde.'

		const res = await login(payload)

		setIsLoading(false)

		if (res.error == 'notFound') {
			setGeneralLoginError()
			return
		}

		if (res.error == 'server') {
			setGeneralLoginError(serverError)
			return
		}

		const user: User = {
			id: localStorage.getItem('id') as string,
			username: localStorage.getItem('username') as string,
		}

		const loginResponse = res.data

		if (!loginResponse) return

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
	}

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
