'use client'

import ImageModel from '@/components/ImageModel'
import PostImage from '@/components/PostImage'
import AuthContext from '@/context/AuthContext'
import logout from '@/helpers/logout'
import useAuth from '@/hooks/useAuth'
import { BaseResponse } from '@/types/BaseResponse'
import { Post } from '@/types/Post'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

async function getPosts(): Promise<BaseResponse<Post[]>> {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL

	const url = `${apiUrl}/Post/GetAllRandomPosts`
	const token = localStorage.getItem('token')

	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: 'no-store',
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

export default function Home() {
	useAuth()

	const router = useRouter()

	const imageWidth = 300

	const { isLoggedIn, setLoggedIn } = useContext(AuthContext)

	// States
	const [posts, setPosts] = useState<Post[]>([])

	useEffect(() => {
		async function fetchPosts() {
			if (isLoggedIn) {
				const res = await getPosts()

				if (res.error === 'auth') {
					logout(router, setLoggedIn)
					return
				}

				if (res.error === 'server') {
					// tratar erro do server
				}

				if (res.data) {
					setPosts(res.data)
				}
			}
		}

		fetchPosts()
	}, [isLoggedIn, router, setLoggedIn])

	return (
		<>
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
					posts.map(post => (
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
