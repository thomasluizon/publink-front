import React, { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import ImageModel from '@/components/ImageModel'

export default function Create() {
	const fileInput = useRef<HTMLInputElement>(null)

	const [error, setError] = useState(false)
	let errorMessage = 'Insira um arquivo jpeg ou png!'

	const [showImg, setShowImg] = useState(false)
	const [imgUrl, setImgUrl] = useState('/a')
	const imgWidth = 450

	const handleFileSubmit = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]

		if (!file) return

		const acceptedImageTypes = ['image/jpeg', 'image/png']

		if (!acceptedImageTypes.includes(file.type)) {
			errorMessage = 'Insira um arquivo jpeg ou png!'
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

		// fetch api to create image with imgUrl
	}

	return (
		<div className="flex flex-col justify-center items-center h-3/4 gap-11">
			<input
				type="file"
				hidden
				ref={fileInput}
				onChange={handleFileSubmit}
			/>
			<h2 className="text-2xl">Enviar foto</h2>
			<button
				className="border-2 rounded-md px-5 py-14 border-gray-400"
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

			<ImageModel
				imgWidth={imgWidth}
				imgAlt="Imagem enviada"
				imgUrl={imgUrl}
				hidden={!showImg}
			/>
		</div>
	)
}
