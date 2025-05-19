import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
	const userName = localStorage.getItem('userName') // Проверка авторизации (из Redux)

	return userName ? <Outlet /> : <Navigate to="/sign-in" replace />
}

export default PrivateRoute
