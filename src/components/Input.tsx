import React from 'react'

const Input = React.forwardRef<
	HTMLInputElement,
	{ label: string; id: string; type?: string }
>(({ label, id, type }, ref) => (
	<input
		className="outline-none border-2 rounded-xl border-gray-300 flex-1 p-4 text-center"
		type={type || 'text'}
		id={id}
		ref={ref}
		placeholder={label}
	/>
))

Input.displayName = 'Input'

export default Input
