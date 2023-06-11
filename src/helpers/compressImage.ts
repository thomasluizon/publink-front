const compressImage = async (
	file: File,
	{ quality, type } = { quality: 1, type: file.type }
) => {
	const imageBitmap = await createImageBitmap(file)
	const canvas = document.createElement('canvas')

	let width = imageBitmap.width
	let height = imageBitmap.height

	const maxWidth = 1280
	const maxHeight = 720

	if (width > maxWidth) {
		let percentage = (maxWidth * 100) / width / 100

		width = maxWidth

		height *= percentage
	} else if (height > maxHeight) {
		let percentage = (maxHeight * 100) / height / 100

		height = maxHeight

		width *= percentage
	}

	canvas.width = imageBitmap.width
	canvas.height = imageBitmap.height
	const ctx = canvas.getContext('2d')

	if (ctx == null) return

	ctx.drawImage(imageBitmap, 0, 0)

	return await new Promise(resolve => canvas.toBlob(resolve, type, quality))
}

export default compressImage
