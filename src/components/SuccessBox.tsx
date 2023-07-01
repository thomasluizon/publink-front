import React from 'react'

export default function SuccessBox({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="text-green-600 border-2 p-3 rounded-xl border-green-600">
			{children}
		</div>
	)
}
