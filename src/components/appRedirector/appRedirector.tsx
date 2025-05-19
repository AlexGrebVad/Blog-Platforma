// вне компонента, чтобы сохранялось между переходами
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

let alreadyRedirected = false

function AppRedirector() {
	const navigate = useNavigate()

	useEffect(() => {
		const isPageReload =
			performance?.navigation?.type === 1 ||
			performance?.getEntriesByType?.('navigation')?.[0]?.type === 'reload'

		if (isPageReload && !alreadyRedirected) {
			alreadyRedirected = true
			navigate('/', { replace: true })
		}
	}, [navigate])

	return null
}

export default AppRedirector
