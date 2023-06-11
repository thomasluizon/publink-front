import IPost from '@/interfaces/IPost'
import Image from 'next/image'
import Link from 'next/link'

export default function PostImage({ post, imgWidth }: IProps) {
	const width = imgWidth || 300

	return (
		<Link href={`/post/${post.id}`} className="mx-auto">
			<Image
				className="rounded-full z-0 hover:scale-105 transition-all"
				src={post.imgUrl}
				alt={post.description}
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

// Interfaces
interface IProps {
	post: IPost
	imgWidth?: number
}
