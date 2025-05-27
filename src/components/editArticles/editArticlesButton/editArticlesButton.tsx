import React from 'react'
import { Link } from 'react-router-dom'
import './editArticlesButton.css'
import { Button } from 'antd'

interface ArticleData {
	title: string
	description: string
	body: string
	tagList: string[]
}

interface EditArticlesProps {
	slug: string
	articleInformation: ArticleData
}

function setArticleInformationToLocalStorage(article: ArticleData): void {
	localStorage.setItem('article', JSON.stringify(article))
}

function EditArticleButton({ slug, articleInformation }: EditArticlesProps) {
	return (
		<div className="editArticleBlock">
			<Link className="title-header" to={`/articles/${slug}/edit`}>
				<Button
					onClick={setArticleInformationToLocalStorage(articleInformation)}
					className="editButton"
					primary
				>
					Edit
				</Button>
			</Link>
		</div>
	)
}

export default EditArticleButton
