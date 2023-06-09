import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import ImageModel from '@/components/ImageModel'

interface IPayload {
	title: string
	description: string
	imgUrl: string
}

export default function Create() {
	const fileInput = useRef<HTMLInputElement>(null)
	const titleRef = useRef<HTMLInputElement>(null)
	const descRef = useRef<HTMLInputElement>(null)

	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const [showImg, setShowImg] = useState(false)
	const [imgUrl, setImgUrl] = useState('/a')
	const imgWidth = 450

	const [isLoading, setIsLoading] = useState(false)

	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]

		if (!file) return

		console.log(file)

		const acceptedImageTypes = ['image/jpeg', 'image/png']

		if (!acceptedImageTypes.includes(file.type)) {
			setErrorMessage('Insira um arquivo jpeg ou png!')
			setError(true)
			setShowImg(false)
			return
		}

		setError(false)

		const reader = new FileReader()

		reader.onload = event => {
			const dataUrl = event.target?.result as string

			setImgUrl(dataUrl)
			setShowImg(true)
		}

		reader.readAsDataURL(file)
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
		// fetch post api
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

				<button className="border-2 p-2 rounded-xl hover:bg-logo hover:text-white hover:border-logo transition-colors">
					Enviar
				</button>
			</form>
		</div>
	)
}

const Input = React.forwardRef<HTMLInputElement, { label: string; id: string }>(
	({ label, id }, ref) => (
		<input
			className="outline-none border-2 rounded-xl border-gray-300 flex-1 p-4 text-center"
			type="text"
			id={id}
			ref={ref}
			placeholder={label}
		/>
	)
)

Input.displayName = 'Input'
