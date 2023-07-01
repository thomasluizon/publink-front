export type BaseResponse<T = void> = {
	data?: T
	error?: 'auth' | 'server' | 'notFound' | 'badRequest'
}
