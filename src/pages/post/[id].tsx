import ImageModel from '@/components/ImageModel'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

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
					<h3 className="text-center text-lg">Você também pode gostar</h3>
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

interface IPosts {
	title: string
	imgUrl: string
	imgAlt: string
	otherImgs: IImage[]
}

export const getServerSideProps: GetServerSideProps<{
	post: IPosts
}> = async context => {
	const { id } = context.query

	// fetch api by id

	// fetch next images by id

	const post: IPosts = {
		title: 'Foto Teste',
		imgUrl: 'https://i.imgur.com/drozwAm.jpeg',
		imgAlt: 'Imagem teste',
		otherImgs: [
			{
				imgUrl: 'https://i.imgur.com/rC7z7KP.png',
				imgAlt: 'aaaa',
				link: '/post/1',
			},
			{
				imgUrl: 'https://i.imgur.com/UICTg9A.png',
				imgAlt: 'aaaa',
				link: '/post/2',
			},
			{
				imgUrl: 'https://i.imgur.com/wOmkBgy.png',
				imgAlt: 'aaaa',
				link: '/post/3',
			},
			{
				imgUrl: 'https://i.imgur.com/sk0Ev2e.png',
				imgAlt: 'aaaa',
				link: '/post/4',
			},
		],
	}

	return { props: { post } }
}

interface IImage {
	imgUrl: string
	imgAlt: string
	link: string
}
