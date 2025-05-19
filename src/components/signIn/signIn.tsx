/* eslint-disable jsx-a11y/label-has-associated-control */

import { useForm } from 'react-hook-form'

import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logInUser } from '@/api/signInApi'
import { succesLoginHeaderChanger } from '@/stores/reducers/headerReducer'

import useSetUserProfileValues from '@/utils/setUserProfileValues'

import './signIn.css' // Подключаем стили

const SignIn = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const setUserValue = useSetUserProfileValues()

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm()

	const onSubmit = async (data) => {
		try {
			const result = await logInUser(data)

			if (result) {
				localStorage.setItem('isUserLogined', 'true')
				dispatch(succesLoginHeaderChanger())
				navigate('/')

				localStorage.setItem('userName', result.user.username)
				localStorage.setItem('token', result.user.token)
				localStorage.setItem('email', result.user.email)
				if (result.user.image) {
					localStorage.setItem('avatarImage', result.user.image)
				} else {
					localStorage.setItem('avatarImage', '')
				}

				setUserValue()
			}
		} catch (error) {
			if (error.errors) {
				setError('password', {
					type: 'server',
					message: 'Email or password are invalid',
				})
			}
		}
	}

	return (
		<div className="auth-form">
			<h2>Sign In</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Поле Email */}
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input
						id="email"
						type="email"
						placeholder="Email"
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Invalid email address',
							},
						})}
					/>
					{errors.email && <span className="error">{errors.email.message}</span>}
				</div>

				{/* Поле Password */}
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						placeholder="Password"
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Password must be at least 6 characters',
							},
						})}
					/>
					{errors.password && <span className="error">{errors.password.message}</span>}
				</div>

				{/* Кнопка отправки */}
				<button type="submit" className="submit-btn">
					Login
				</button>

				{/* Ссылка на регистрацию */}
				<p className="auth-link">
					Don&apos;t have an account? have an account? <Link to="/sign-up">Sign Up</Link>
				</p>
			</form>
		</div>
	)
}

export default SignIn
