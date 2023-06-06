import ImagePost from '@/models/ImagePost'
import Image from 'next/image'
import Link from 'next/link'

interface IProps {
	img: ImagePost
}

export default function PostImage({ img }: IProps) {
	return (
		<Link href={img.postUrl} key={img.url}>
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
		</Link>
	)
}
