import ImagePost from '@/models/ImagePost'
import Image from 'next/image'
import Link from 'next/link'

interface IProps {
	img: ImagePost
	imgWidth?: number
}

export default function PostImage({ img, imgWidth }: IProps) {
	const width = imgWidth || 300

	return (
		<Link href={img.postUrl} key={img.url}>
			<Image
				className="rounded-full"
				src={img.url}
				alt={img.alt}
				width={width}
				height={width}
				draggable={false}
				style={{
					maxHeight: `${width}px`,
					objectFit: 'cover',
				}}
			/>
		</Link>
	)
}
