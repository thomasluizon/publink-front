'use client'

import ImageModel from '@/components/ImageModel'
import AuthContext from '@/context/AuthContext'
import logout from '@/helpers/logout'
import useAuth from '@/hooks/useAuth'
import { BaseResponse } from '@/types/BaseResponse'
import { PostAndUser } from '@/types/PostAndUser'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

type Posts = {
	title?: string
	imgUrl?: string
	imgAlt?: string
	otherImgs?: Image[]
}

type Image = {
	imgUrl: string
	imgAlt: string
	link: string
}

async function fetchPosts(id: string): Promise<BaseResponse<PostAndUser[]>> {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	const url = `${apiUrl}/Post/GetPostAndUserByIdAndRandom/${id}`

	const token = localStorage.getItem('token')

	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	if (res.status === 401) {
		return {
			error: 'auth',
		}
	}

	if (!res.ok) {
		return {
			error: 'server',
		}
	}

	return {
		data: await res.json(),
	}
}

export default function Post({ id }: { id: string }) {
	useAuth()
	const router = useRouter()

	const imgWidth = 450
	const miniImgWidth = 150
	const title = 'Publink'

	// State
	const [post, setPost] = useState<Posts>({})
	const { setLoggedIn } = useContext(AuthContext)

	useEffect(() => {
		async function getPosts() {
			const res = await fetchPosts(id)

			if (res.error === 'auth') {
				logout(router, setLoggedIn)
				return
			}

			if (res.error === 'server') {
				router.push('/')
				return
			}

			if (!res.data) return

			const posts = res.data

			const firstPost = posts[0].post

			posts.shift()

			const otherImages: Image[] = []

			posts.forEach(postAndUser => {
				const post = postAndUser.post

				const img: Image = {
					imgUrl: post.imgUrl,
					imgAlt: post.description,
					link: `/post/${post.id}`,
				}

				otherImages.push(img)
			})

			const post: Posts = {
				title: firstPost.title,
				imgUrl: firstPost.imgUrl,
				imgAlt: firstPost.description,
				otherImgs: otherImages,
			}

			setPost(post)
		}

		getPosts()
	}, [id, router, setLoggedIn])

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
