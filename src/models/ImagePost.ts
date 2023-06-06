export default class ImagePost {
	url: string
	alt: string
	postUrl: string
	id: number

	constructor(url: string, alt: string, id: number) {
		this.url = url
		this.alt = alt
		this.id = id
		this.postUrl = `/post/${id}`
	}
}
