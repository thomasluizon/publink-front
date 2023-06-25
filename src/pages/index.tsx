import ImageModel from '@/components/ImageModel'
import PostImage from '@/components/PostImage'
import AuthContext from '@/context/AuthContext'
import logout from '@/helpers/logout'
import useAuth from '@/hooks/useAuth'
import IPost from '@/interfaces/IPost'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

export default function Home({
	apiUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	useAuth()
	const router = useRouter()
	const imageWidth = 300
	const { isLoggedIn, setLoggedIn, setUser } = useContext(AuthContext)

	// States
	const [posts, setPosts] = useState<IPost[]>([])

	useEffect(() => {
		const fetchPosts = async () => {
			if (!isLoggedIn) return

			const url = `${apiUrl}/Post/GetAllRandomPosts`
			const token = localStorage.getItem('token')

			const res = await fetch(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (res.status === 401) {
				logout(router, setLoggedIn)
				return
			}

			const json = await res.json()

			if (!res.ok) {
				console.error(json)
			}

			const posts = json as IPost[]
			setPosts(posts)
		}

		fetchPosts()
	}, [apiUrl, router, isLoggedIn, setLoggedIn, setUser])
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
	apiUrl: string
}> = async context => {
	const apiUrl = process.env.API_URL as string

	return { props: { apiUrl } }
}
