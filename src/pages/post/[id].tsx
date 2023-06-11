import ImageModel from '@/components/ImageModel'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import fetch from 'node-fetch'
import https from 'https'
import IPost from '@/interfaces/IPost'

export default function Post({
	post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const imgWidth = 450
	const miniImgWidth = 150
	const title = 'Publink'

	return (
		<>
			<Head>
				<title>
					{title} - {post.title}
				</title>
			</Head>
			<div className="flex flex-col justify-center items-center h-3/4 gap-11">
				<h2 className="text-center text-3xl">{post.title}</h2>
				<ImageModel
					imgUrl={post.imgUrl}
					imgAlt={post.imgAlt}
					imgWidth={imgWidth}
				/>
				<div>
					{post.otherImgs.length > 0 ? (
						<h3 className="text-center text-lg">
							Você também pode gostar
						</h3>
					) : (
						false
					)}
					<div className="flex gap-10 justify-center mt-5">
						{post.otherImgs.map(img => (
							<a href={img.link} key={img.link}>
								<ImageModel
									imgUrl={img.imgUrl}
									imgAlt={img.imgAlt}
									imgWidth={miniImgWidth}
									hover
								/>
							</a>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps<{
	post: IPosts
}> = async context => {
	const { id } = context.query

	const url = `${process.env.API_URL}/Post/GetByIdAndRandom/${id}`

	const agent = new https.Agent({
		rejectUnauthorized: false,
	})

	const res = await fetch(url, { agent })

	const json = await res.json()

	const posts = json as IPost[]

	const firstPost = posts[0]

	posts.shift()

	const otherImages: IImage[] = []

	posts.forEach(post => {
		const img: IImage = {
			imgUrl: post.imgUrl,
			imgAlt: post.description,
			link: `/post/${post.id}`,
		}

		otherImages.push(img)
	})

	const post: IPosts = {
		title: firstPost.title,
		imgUrl: firstPost.imgUrl,
		imgAlt: firstPost.description,
		otherImgs: otherImages,
	}

	return { props: { post } }
}

// Interfaces
interface IPosts {
	title: string
	imgUrl: string
	imgAlt: string
	otherImgs: IImage[]
}

interface IImage {
	imgUrl: string
	imgAlt: string
	link: string
}
