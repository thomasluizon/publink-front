import React from 'react'

export default function Button({
	disabled,
	children,
}: {
	disabled?: boolean
	children?: any
}) {
	return (
		<button
			disabled={disabled}
			className="border-2 p-2 rounded-xl hover:bg-logo hover:text-white hover:border-logo transition-colors disabled:hover:bg-red-600"
		>
			{children}
		</button>
	)
}
