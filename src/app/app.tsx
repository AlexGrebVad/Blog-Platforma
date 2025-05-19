import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '@/components/header/header'
import ArticleBlock from '@/components/article-block/article-block'
import ArticlePage from '@/components/articlePage/articlePage'
import SignUp from '@/components/signUp/signUp'
import SignIn from '@/components/signIn/signIn'
import EditProfile from '@/components/editProfile/editProfile'
import AppRedirector from '@/components/appRedirector/appRedirector'
import CreateArticlePage from '@/components/createArticlePage/createArticlePage'
import { Provider } from 'react-redux'
import EditArticlesPage from '@/components/editArticles/editArticlesPage/editArticlesPage'
import PrivateRoute from './PrivateRoute'

import { store } from '../stores/store'

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppRedirector />
				<Header />
				<Routes>
					<Route path="/" element={<ArticleBlock />} />
					<Route path="/articles/:slug" element={<ArticlePage />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/sign-in" element={<SignIn />} />

					<Route element={<PrivateRoute />}>
						<Route path="/profile" element={<EditProfile />} />
						<Route path="/new-article" element={<CreateArticlePage />} />
						<Route path="/articles/:slug/edit" element={<EditArticlesPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	)
}

export default App
