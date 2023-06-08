import React from 'react'
import Image from 'next/image'

interface IProps {
	imgUrl: string
	imgAlt: string
	imgWidth: number
	roundedFull?: boolean
}

export default function ImageModel(props: IProps) {
	return (
		<Image
			src={props.imgUrl}
			alt={props.imgAlt}
			className={`${props.roundedFull ? 'rounded-full' : 'rounded-lg'}`}
			width={props.imgWidth}
			height={props.imgWidth}
			style={{
				maxHeight: `${props.imgWidth}px`,
				objectFit: 'cover',
			}}
		/>
	)
}
