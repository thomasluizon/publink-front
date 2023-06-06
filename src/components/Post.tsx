import ImagePost from '@/models/ImagePost'
import Image from 'next/image'

interface IProps {
	img: ImagePost
}

export default function Post({ img }: IProps) {
	return (
		<a href={img.postUrl} key={img.url}>
			<Image
				className="rounded-full"
				src={img.url}
				alt={img.alt}
				width={300}
				height={300}
				draggable={false}
				style={{
					maxHeight: '300px',
					objectFit: 'cover',
				}}
			/>
		</a>
	)
}
