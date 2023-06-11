import Button from '@/components/Button'
import Input from '@/components/Input'
import React, { FormEvent, useRef } from 'react'

export default function Register() {
	// Refs
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	// Functions
	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()

		if (emailRef.current) emailRef.current.value = ''

		if (passwordRef.current) passwordRef.current.value = ''

		alert('Função de registrar não está funcionando no momento!')
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
			</form>
		</div>
	)
}
