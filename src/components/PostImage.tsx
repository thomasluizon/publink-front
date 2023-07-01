import { Post } from '@/types/Post'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
	post: Post
	imgWidth?: number
}

export default function PostImage({ post, imgWidth }: Props) {
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
