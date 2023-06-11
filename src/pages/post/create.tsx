import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import ImageModel from '@/components/ImageModel'
import IPost from '@/interfaces/IPost'
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Input from '@/components/Input'
import compressImage from '@/helpers/compressImage'
import Button from '@/components/Button'

export default function Create(props: {
	apiUrl: InferGetServerSidePropsType<typeof getServerSideProps>
}) {
	const router = useRouter()

	// Refs
	const fileInput = useRef<HTMLInputElement>(null)
	const titleRef = useRef<HTMLInputElement>(null)
	const descRef = useRef<HTMLInputElement>(null)

	// States
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const [showImg, setShowImg] = useState(false)
	const [imgUrl, setImgUrl] = useState('/a')

	const [isLoading, setIsLoading] = useState(false)

	const imgWidth = 450

	// Functions
	const setGeneralError = () => {
		setIsLoading(false)
		setShowImg(false)
		setImgUrl('/a')
		setErrorMessage('Error do servidor, tente novamente mais tarde!')
		setError(true)
	}

	const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]

		if (!file) return

		const acceptedImageTypes = ['image/jpeg', 'image/png']

		if (!acceptedImageTypes.includes(file.type)) {
			setErrorMessage('Insira um arquivo jpeg ou png!')
			setError(true)
			setShowImg(false)
			return
		}

		setError(false)

		const reader = new FileReader()

		const compressed = await compressImage(file, {
			quality: 0.1,
			type: 'image/jpeg',
		})

		const fileCompressed = compressed as File

		reader.onload = event => {
			const dataUrl = event.target?.result as string

			if (dataUrl.length > 65534) {
				setError(true)
				setErrorMessage('Insira uma imagem menor')
				return
			}

			setImgUrl(dataUrl)
			setShowImg(true)
		}

		reader.readAsDataURL(fileCompressed)
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const title = titleRef.current?.value
		const description = descRef.current?.value

		if (
			title == undefined ||
			description == undefined ||
			title === '' ||
			description === ''
		) {
			setError(true)
			setErrorMessage('Insira um titulo e uma descrição válida')
			return
		}

		if (imgUrl == undefined || imgUrl === '/a') {
			setError(true)
			setErrorMessage('Insira uma imagem')
			return
		}

		setError(false)

		const payload: IPayload = {
			title,
			description,
			imgUrl,
		}

		setIsLoading(true)
		setShowImg(false)

		const apiUrl = props.apiUrl as unknown as string

		const url = `${apiUrl}/Post/Create`

		try {
			const res = await fetch(url, {
				method: 'post',
				body: JSON.stringify(payload),
				headers: { 'Content-Type': 'application/json' },
			})

			if (!res.ok) {
				setGeneralError()
				return
			}

			const json = await res.json()
			const post = json as IPost

			router.push(`/post/${post.id}`)
		} catch (e) {
			setGeneralError()
			return
		}
	}

	return (
		<div className="flex flex-col justify-center items-center h-3/4 gap-11">
			<input
				type="file"
				hidden
				ref={fileInput}
				onChange={handleFileUpload}
			/>

			<h2 className="text-2xl">Enviar foto</h2>
			<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
				<Input id="title" label="Titulo" ref={titleRef} />
				<Input id="desc" label="Descrição" ref={descRef} />
				<button
					type="button"
					className="border-2 rounded-xl px-5 py-14 border-gray-400 hover:bg-logo hover:text-white hover:border-logo transition-colors"
					onClick={() => fileInput.current?.click()}
				>
					Clique aqui para selecionar um arquivo (png ou jpeg)
				</button>

				{error ? (
					<div className="text-red-600 border-2 p-3 rounded-xl border-red-600">
						{errorMessage}
					</div>
				) : (
					false
				)}

				{isLoading ? (
					<div className="flex items-center justify-center p-3">
						<div className="flex space-x-2 animate-pulse">
							<div className="w-3 h-3 bg-logo rounded-full"></div>
							<div className="w-3 h-3 bg-logo rounded-full"></div>
							<div className="w-3 h-3 bg-logo rounded-full"></div>
						</div>
					</div>
				) : (
					false
				)}

				<ImageModel
					imgWidth={imgWidth}
					imgAlt="Imagem enviada"
					imgUrl={imgUrl}
					hidden={!showImg}
				/>

				<Button>Enviar</Button>
			</form>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps<{
	apiUrl: string | undefined
}> = async context => {
	const apiUrl = process.env.API_URL
	return { props: { apiUrl } }
}

// Interfaces
interface IPayload {
	title: string
	description: string
	imgUrl: string
}
