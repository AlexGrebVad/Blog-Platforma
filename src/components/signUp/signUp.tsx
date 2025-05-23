/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '@/api/signUpApi'
import './signUp.css'

interface UserData {
	agreement: boolean
	confirmPassword: string
	email: string
	password: string
}

const SignUp = () => {
	const [successRegistration, setSuccessRegistration] = useState('')
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		watch,
		setError,
		formState: { errors },
	} = useForm()

	const onSubmit = async (data: UserData) => {
		try {
			registerUser(data)
			setSuccessRegistration('true')
			navigate('/')
		} catch (error) {
			if (error.errors.email) {
				setSuccessRegistration('')
				setError('email', {
					type: 'server',
					message: error.errors.email,
				})
			}

			if (error.errors.username) {
				setError('username', {
					type: 'server',
					message: error.errors.username,
				})
			}
		}
	}

	const password = watch('password')

	return (
		<div className="auth-form">
			<h2>Create new account</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Поле Username */}
				<div className="form-group">
					<label>Username</label>
					<input
						type="text"
						placeholder="Username"
						{...register('username', {
							required: 'Username is required',
							minLength: {
								value: 3,
								message: 'Username must be at least 3 characters',
							},
							maxLength: {
								value: 20,
								message: 'Username must not exceed 20 characters',
							},
							pattern: {
								value: /^[a-z][a-z0-9]*$/,
								message: 'You can only use lowercase English letters and numbers',
							},
						})}
					/>
					{errors.username && <p className="error">{errors.username.message}</p>}
				</div>
				{/* Поле Email */}
				<div className="form-group">
					<label>Email address</label>
					<input
						type="email"
						placeholder="Email"
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /(^[a-z][a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/,
								message:
									'Invalid email address, you need to use lowercase first latter, @ symbol and "." ',
							},
						})}
					/>
					{errors.email && <p className="error">{errors.email.message}</p>}
				</div>
				{/* Поле Password */}
				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						placeholder="Password"
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Password must be at least 6 characters',
							},
							maxLength: {
								value: 40,
								message: 'Password must not exceed 40 characters',
							},
						})}
					/>
					{errors.password && <p className="error">{errors.password.message}</p>}
				</div>
				{/* Поле Confirm Password */}
				<div className="form-group">
					<label>Repeat Password</label>
					<input
						type="password"
						placeholder="Repeat Password"
						{...register('confirmPassword', {
							required: 'Please confirm your password',
							validate: (value) => value === password || 'Passwords do not match',
						})}
					/>
					{errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
				</div>
				{/* Чекбокс соглашения */}
				<div className="form-group">
					<label className="checkbox-label">
						<input
							type="checkbox"
							{...register('agreement', {
								required: 'You must agree to the terms',
							})}
						/>
						I agree to the processing of my personal information
					</label>
					{errors.agreement && <p className="error">{errors.agreement.message}</p>}
				</div>
				<button type="submit" className="submit-btn">
					Create
				</button>
				{successRegistration && <p className="successRegistration">The user is registered</p>}
				<p className="auth-link">
					Already have an account? <Link to="/sign-in">Sign In</Link>
				</p>
			</form>
		</div>
	)
}

export default SignUp
