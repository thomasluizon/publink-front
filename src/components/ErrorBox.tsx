import React from 'react'

export default function ErrorBox({ children }: { children: any }) {
	return (
		<div className="text-red-600 border-2 p-3 rounded-xl border-red-600">
			{children}
		</div>
	)
}
