import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { succesLoginHeaderChanger } from '@/stores/reducers/headerReducer'
import './header.css'
import { RootState } from '@/stores/store'

function Header() {
	const defaultAvatat =
		'https://thumbs.dreamstime.com/b/%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B9-%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82-%D0%B1%D0%B5%D0%B7%D0%BB%D0%B8%D0%BA%D0%B8%D0%B9-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80-%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D1%8B-223352668.jpg'
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		signInVisible,
		signUpVisible,
		createArticleVisible,
		userInformationVisible,
		logOutVisible,
		isUserLoginedSwitch,
	} = useSelector((state: RootState) => state.headerSlice)
	const { userName, avatarImage } = useSelector((state: RootState) => state.userProfileSlice)

	useEffect(() => {
		if (isUserLoginedSwitch) {
			dispatch(succesLoginHeaderChanger())
		}
	}, [isUserLoginedSwitch, dispatch])

	const logOut = () => {
		navigate('/')
		dispatch(succesLoginHeaderChanger())
		localStorage.clear()
	}

	return (
		<header className="header">
			<Link to="/" className="header__point1" style={{ textDecoration: 'none', color: 'inherit' }}>
				<p className="header__point1">Realworld Blog</p>
			</Link>

			<Link
				to="/new-article"
				style={{ textDecoration: 'none', color: 'inherit', marginLeft: 'auto' }}
			>
				<p className={createArticleVisible ? 'header__point3 createArticle' : 'hidden'}>
					Create article
				</p>
			</Link>

			<Link to="/Profile" style={{ textDecoration: 'none', color: 'inherit' }}>
				<div className={userInformationVisible ? 'userInfo' : 'hidden'}>
					<p className="userName">{userName}</p>
					<div>
						<img className="userAvatar" src={avatarImage || defaultAvatat} alt="" />
					</div>
				</div>
			</Link>
			<Link
				to="/sign-in"
				className={signInVisible ? 'header__point2 signIn' : 'hidden'}
				style={{ textDecoration: 'none', color: 'inherit' }}
			>
				<p className="header__point2 ">Sign In</p>
			</Link>

			<Link
				to="/sign-up"
				className={signUpVisible ? 'header__point1' : 'hidden'}
				style={{ textDecoration: 'none', color: 'inherit' }}
			>
				<p className="header__point3">Sign Up</p>
			</Link>
			<button
				onClick={() => logOut()}
				type="button"
				className={logOutVisible ? 'header__point3 header__point_logOut' : 'hidden'}
			>
				Log Out
			</button>
		</header>
	)
}

export default Header
