import Button from '@/components/Button'
import ErrorBox from '@/components/ErrorBox'
import Input from '@/components/Input'
import Loader from '@/components/Loader'
import AuthContext from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useRef, useState } from 'react'

export default function Register() {
	const router = useRouter()

	// Refs
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	// States
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const { isLoggedIn, setLoggedIn } = useContext(AuthContext)

	// Functions
	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()

		if (emailRef.current) emailRef.current.value = ''

		if (passwordRef.current) passwordRef.current.value = ''

		alert('Função de registrar não está funcionando no momento!')

		router.push('/login')
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

				<Button>Registrar</Button>

				{isLoading ? <Loader /> : false}

				{error ? <ErrorBox>{errorMessage}</ErrorBox> : false}
			</form>
		</div>
	)
}
