import React from 'react'
import { Link } from 'react-router-dom'
import './editArticlesButton.css'
import { Button } from 'antd'

interface EditArticlesProps {
	slug: string
}
function EditArticleButton({ slug }: EditArticlesProps) {
	return (
		<div className="editArticleBlock">
			<Link className="title-header" to={`/articles/${slug}/edit`}>
				<Button className="editButton" primary>
					Edit
				</Button>
			</Link>
		</div>
	)
}

export default EditArticleButton
