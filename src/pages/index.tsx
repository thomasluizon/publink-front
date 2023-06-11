import Head from 'next/head'
import Link from 'next/link'
import PostImage from '@/components/PostImage'
import ImageModel from '@/components/ImageModel'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import fetch from 'node-fetch'
import https from 'https'
import IPost from '@/interfaces/IPost'
import { use, useContext, useEffect } from 'react'
import AuthContext from '@/context/AuthContext'
import { useRouter } from 'next/router'

export default function Home(props: {
	posts: InferGetServerSidePropsType<typeof getServerSideProps>
}) {
	const router = useRouter()

	const imageWidth = 300
	const posts = (props?.posts || []) as unknown as IPost[]

	// States
	const { isLoggedIn, setLoggedIn } = useContext(AuthContext)

	useEffect(() => {
		if (!isLoggedIn) {
			router.push('/login')
		}
	}, [isLoggedIn, router])

	return (
		<>
			<Head>
				<title>Publink - Feed</title>
			</Head>
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
			<div className="flex flex-wrap gap-5 justify-between items-center">
				{posts.length > 0 ? (
					posts.map((post: IPost) => (
						<PostImage
							imgWidth={imageWidth}
							post={post}
							key={post.imgUrl}
						/>
					))
				) : (
					<h2 className="text-center w-full text-2xl">
						Nenhuma imagem foi encontrada.
					</h2>
				)}
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

		const json = await res.json()

		const posts = json as IPost[]

		return { props: { posts } }
	} catch (error) {
		console.error('Error fetching data:', error)

		return { props: { posts: [] } }
	}
}
