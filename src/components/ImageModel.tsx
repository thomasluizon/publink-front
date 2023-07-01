import Image from 'next/image'

type Props = {
	imgUrl: string
	imgAlt: string
	imgWidth: number
	roundedFull?: boolean
	hidden?: boolean
	hover?: boolean
}

export default function ImageModel(props: Props) {
	return (
		<Image
			src={props.imgUrl}
			alt={props.imgAlt}
			className={`${props.roundedFull ? 'rounded-full' : 'rounded-lg'} ${
				props.hover ? 'transition-all hover:scale-105' : ''
			}`}
			width={props.imgWidth}
			height={props.imgWidth}
			style={{
				maxHeight: `${props.imgWidth}px`,
				objectFit: 'cover',
			}}
			hidden={props.hidden}
		/>
	)
}
