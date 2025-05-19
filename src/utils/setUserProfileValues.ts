import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import {
	userNameChanger,
	tokenChanger,
	emailAddressChanger,
	avatarImageChanger,
} from '@/stores/reducers/userProfileInformationReducer'

export default function useSetUserProfileValues() {
	const dispatch = useDispatch()

	const setUserProfileValues = useCallback(() => {
		const userName = localStorage.getItem('userName')
		const token = localStorage.getItem('token')
		const email = localStorage.getItem('email')
		const avatarImage = localStorage.getItem('avatarImage')

		dispatch(userNameChanger(userName))
		dispatch(tokenChanger(token))
		dispatch(emailAddressChanger(email))
		dispatch(avatarImageChanger(avatarImage))
	}, [dispatch])

	return setUserProfileValues
}
