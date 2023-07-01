'use client'

import Button from '@/components/Button'
import ErrorBox from '@/components/ErrorBox'
import Input from '@/components/Input'
import Loader from '@/components/Loader'
import SuccessBox from '@/components/SuccessBox'
import { BaseResponse } from '@/types/BaseResponse'
import { useRouter } from 'next/navigation'
import { FormEvent, useRef, useState } from 'react'

async function register(payload: {
	username: string
	email: string
	password: string
}): Promise<BaseResponse> {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL

	const url = `${apiUrl}/Auth/Register`

	const res = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
		},
	})

	if (res.status === 400) {
		return {
			error: 'badRequest',
		}
	}

	if (!res.ok) {
		return {
			error: 'server',
		}
	}

	return {}
}

export default function Register() {
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
		setIsLoading(false)
		setIsSuccess(false)

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
			return
		}

		const payload = {
			username,
			email,
			password,
		}

		setIsLoading(true)

		const serverError = 'Erro no servidor - Tente novamente mais tarde.'

		const res = await register(payload)

		setIsLoading(false)

		if (res.error === 'badRequest') {
			setGeneralRegisterError('Usuário já registrado')
			return
		}

		if (res.error === 'server') {
			setGeneralRegisterError(serverError)
			return
		}

		setIsSuccess(true)
		setIsLoading(true)
		setError(false)

		setTimeout(() => {
			router.push('/login')
		}, 3000)
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
