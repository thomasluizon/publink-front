export default class ImagePost {
	url: string
	alt: string
	postUrl: string
	id: number
	static count: number = 0

	constructor(url: string, alt: string) {
		ImagePost.count++

		this.url = url
		this.alt = alt
		this.id = ImagePost.count
		this.postUrl = `/post/${this.id}`
	}
}
