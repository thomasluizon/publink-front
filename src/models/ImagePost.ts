export default class ImagePost {
	url: string
	alt: string
	postUrl: string

	constructor(url: string, alt: string, postUrl: string) {
		this.url = url
		this.alt = alt
		this.postUrl = postUrl
	}
}
