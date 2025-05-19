import { createSlice } from '@reduxjs/toolkit'

const isUserLoginedFromStorage = localStorage.getItem('isUserLogined') === 'true'

interface HeaderState {
	signInVisible: boolean
	signUpVisible: boolean
	createArticleVisible: boolean
	userInformationVisible: boolean
	logOutVisible: boolean
	isUserLoginedSwitch: boolean
}

const initialState: HeaderState = {
	signInVisible: true,
	signUpVisible: true,
	createArticleVisible: false,
	userInformationVisible: false,
	logOutVisible: false,
	isUserLoginedSwitch: isUserLoginedFromStorage,
}

const headerSlice = createSlice({
	name: 'header',
	initialState,
	reducers: {
		succesLoginHeaderChanger: (state) => {
			state.signInVisible = !state.signInVisible
			state.signUpVisible = !state.signUpVisible
			state.createArticleVisible = !state.createArticleVisible
			state.userInformationVisible = !state.userInformationVisible
			state.logOutVisible = !state.logOutVisible
		},
		isUserLoginedChanger: (state) => {
			state.isUserLoginedSwitch = !state.isUserLoginedSwitch
		},
	},
})

export const { succesLoginHeaderChanger, isUserLoginedChanger } = headerSlice.actions

export default headerSlice.reducer
