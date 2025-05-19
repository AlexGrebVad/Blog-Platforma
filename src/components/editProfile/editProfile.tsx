/* eslint-disable jsx-a11y/label-has-associated-control */

import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './editProfile.css'
import { RootState } from '@/stores/store'
import useSetUserProfileValues from '@/utils/setUserProfileValues'
import { avatarImageChanger } from '@/stores/reducers/userProfileInformationReducer'
import editProfile from '@/api/editProfileApi'

const EditProfile = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const setUserValue = useSetUserProfileValues()
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		reset,
	} = useForm()

	const { userName, emailAddress, avatarImage, token } = useSelector(
		(state: RootState) => state.userProfileSlice,
	)

	useEffect(() => {
		setUserValue()
	}, [setUserValue])

	useEffect(() => {
		if (userName || emailAddress || avatarImage) {
			reset({
				username: userName,
				email: emailAddress,
				avatar: avatarImage,
			})
		}
	}, [userName, emailAddress, avatarImage, reset])

	const onSubmit = async (data) => {
		try {
			const responce = await editProfile(data, token)

			if (responce) {
				navigate('/')
				localStorage.setItem('userName', data.username)
				localStorage.setItem('token', token)
				localStorage.setItem('email', data.email)
				localStorage.setItem('avatarImage', data.avatar)
				dispatch(avatarImageChanger(data.avatar))
			}
			return true
		} catch (error) {
			const serverErrors = error?.response?.data?.errors

			if (serverErrors) {
				if (serverErrors.email) {
					setError('email', {
						type: 'server',
						message: `Email ${serverErrors.email}`,
					})
				}
				if (serverErrors.username) {
					setError('username', {
						type: 'server',
						message: `Username ${serverErrors.username}`,
					})
				}
				if (serverErrors.avatar) {
					setError('avatar', {
						type: 'server',
						message: `Avatar ${serverErrors.avatar}`,
					})
				}
			}
		}
	}

	return (
		<div className="auth-form">
			<h2>Edit Profile</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Username */}
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						id="username"
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
					{errors.username && <span className="error">{errors.username.message}</span>}
				</div>

				{/* Email */}
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input
						id="email"
						type="email"
						placeholder="Email"
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /(^[a-z][a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/,
								message: 'Invalid email address',
							},
						})}
					/>
					{errors.email && <span className="error">{errors.email.message}</span>}
				</div>

				{/* Password */}
				<div className="form-group">
					<label htmlFor="password">New password</label>
					<input
						id="password"
						type="password"
						placeholder="New password"
						{...register('password', {
							// required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Password must be at least 6 characters',
							},
						})}
					/>
					{errors.password && <span className="error">{errors.password.message}</span>}
				</div>

				{/* Avatar URL */}
				<div className="form-group">
					<label htmlFor="avatar">Avatar image (url)</label>
					<input
						id="avatar"
						type="url"
						placeholder="https://example.com/avatar.jpg"
						{...register('avatar', {
							required: 'Avatar URL is required',
							pattern: {
								value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
								message: 'Invalid image URL',
							},
						})}
					/>
					{errors.avatar && <span className="error">{errors.avatar.message}</span>}
				</div>

				{/* Submit */}
				<button type="submit" className="submit-btn">
					Save
				</button>
			</form>
		</div>
	)
}

export default EditProfile
