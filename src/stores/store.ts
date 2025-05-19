import { configureStore } from '@reduxjs/toolkit'
import articlesSliceReducer from './reducers/articleReducer'
import FullArticleSliceReducer from './reducers/fullArticleInformationReducer'
import headerSliceReducer from './reducers/headerReducer'
import userProfileSliceReducer from './reducers/userProfileInformationReducer'

const rootReducer = {
	articlesSlice: articlesSliceReducer,
	fullArticleSlice: FullArticleSliceReducer,
	headerSlice: headerSliceReducer,
	userProfileSlice: userProfileSliceReducer,
}

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: true,
			serializableCheck: true,
			immutableCheck: true,
		}),
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
