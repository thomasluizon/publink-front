export default function Button({
	disabled,
	children,
	onClick,
	isButton,
}: {
	disabled?: boolean
	children?: any
	onClick?: () => void
	isButton?: boolean
}) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			type={isButton ? 'button' : 'submit'}
			className="border-2 p-2 rounded-xl hover:bg-logo hover:text-white hover:border-logo transition-colors disabled:hover:bg-red-600"
		>
			{children}
		</button>
	)
}
