import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	userName: '',
	emailAddress: '',
	avatarImage: '',
	token: '',
}

const userProfileSlice = createSlice({
	name: 'userProfile',
	initialState,
	reducers: {
		userNameChanger: (state, action) => {
			state.userName = action.payload
		},
		emailAddressChanger: (state, action) => {
			state.emailAddress = action.payload
		},
		avatarImageChanger: (state, action) => {
			state.avatarImage = action.payload
		},
		tokenChanger: (state, action) => {
			state.token = action.payload
		},
	},
})

export const { userNameChanger, emailAddressChanger, avatarImageChanger, tokenChanger } =
	userProfileSlice.actions

export default userProfileSlice.reducer
