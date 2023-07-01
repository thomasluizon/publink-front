export default function ErrorBox({ children }: { children: React.ReactNode }) {
	return (
		<div className="text-red-600 border-2 p-3 rounded-xl border-red-600">
			{children}
		</div>
	)
}
