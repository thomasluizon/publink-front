import Head from 'next/head'
import Link from 'next/link'
import PostImage from '@/components/PostImage'
import ImageModel from '@/components/ImageModel'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import fetch from 'node-fetch'
import https from 'https'
import IPost from '@/interfaces/IPost'

export default function Home(props: {
	posts: InferGetServerSidePropsType<typeof getServerSideProps>
}) {
	const imageWidth = 300

	const posts = (props?.posts || []) as unknown as IPost[]

	return (
		<>
			<Head>
				<title>Publink - Feed</title>
			</Head>
			<div className="flex flex-wrap gap-5 justify-between items-center">
				<Link
					href="/post/create"
					className="mx-auto fixed bottom-5 left-1/2 -translate-x-1/2 hover:scale-105 transition-all z-10"
				>
					<ImageModel
						imgWidth={imageWidth / 4}
						imgAlt="Imagem de um símbolo de mais"
						imgUrl="/imgs/plus.png"
						roundedFull
					/>
				</Link>
				{posts.map((post: IPost) => (
					<PostImage imgWidth={imageWidth} post={post} key={post.imgUrl} />
				))}
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps<{
	posts: IPost[]
}> = async context => {
	const url = `${process.env.API_URL}/Post/GetAllRandomPosts`

	try {
		const agent = new https.Agent({
			rejectUnauthorized: false,
		})

		const res = await fetch(url, { agent })

		console.log(url)

		const json = await res.json()

		const posts = json as IPost[]

		return { props: { posts } }
	} catch (error) {
		console.error('Error fetching data:', error)

		return { props: { posts: [] } }
	}
}
