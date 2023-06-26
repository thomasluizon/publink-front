import ImageModel from '@/components/ImageModel'
import AuthContext from '@/context/AuthContext'
import logout from '@/helpers/logout'
import useAuth from '@/hooks/useAuth'
import IPost from '@/interfaces/IPost'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

export default function Post({
	id,
	apiUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	useAuth()
	const router = useRouter()

	const imgWidth = 450
	const miniImgWidth = 150
	const title = 'Publink'

	// State
	const [post, setPost] = useState<IPosts>({})
	const { setLoggedIn } = useContext(AuthContext)

	useEffect(() => {
		const fetchPost = async () => {
			const url = `${apiUrl}/Post/GetByIdAndRandom/${id}`

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

			if (!res.ok) {
				router.push('/')
				return
			}

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

			setPost(post)
		}

		fetchPost()
	}, [apiUrl, id, router, setLoggedIn])

	return (
		<>
			<Head>
				<title>
					{title} - {post.title || 'Imagem'}
				</title>
			</Head>
			<div className="flex flex-col justify-center items-center h-3/4 gap-11">
				<h2 className="text-center text-3xl">{post.title}</h2>
				<ImageModel
					imgUrl={post.imgUrl || '/a'}
					imgAlt={post.imgAlt || ''}
					imgWidth={imgWidth}
				/>
				<div>
					{post.otherImgs && post.otherImgs.length > 0 ? (
						<h3 className="text-center text-lg">
							Você também pode gostar
						</h3>
					) : (
						false
					)}
					<div className="flex gap-10 justify-center mt-5">
						{post.otherImgs &&
							post.otherImgs.map(img => (
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
	apiUrl: string
	id: string | string[] | undefined
}> = async context => {
	const { id } = context.query
	const apiUrl = process.env.API_URL as string

	return { props: { id, apiUrl } }
}

// Interfaces
interface IPosts {
	title?: string
	imgUrl?: string
	imgAlt?: string
	otherImgs?: IImage[]
}

interface IImage {
	imgUrl: string
	imgAlt: string
	link: string
}
