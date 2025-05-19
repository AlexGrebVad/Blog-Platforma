import React from 'react'
import { useNavigate } from 'react-router-dom'
import deleteArticle from '@/api/deleteArticleApi'
import { Popconfirm, Button } from 'antd'
import './deleteArticle.css'

interface DeleteArticleProps {
	slug: string
}

function DeleteArticle({ slug }: DeleteArticleProps) {
	const navigate = useNavigate()

	async function articleDelete() {
		const successDeleteArticle = await deleteArticle(slug)
		if (successDeleteArticle) {
			navigate('/')
		}
	}
	return (
		<div className="editDeleteBlock">
			<Popconfirm
				title="Are you sure to delete this article?"
				onConfirm={() => articleDelete()}
				okText="Yes"
				cancelText="No"
				placement="right"
			>
				<Button className="deleteButton" danger>
					Delete
				</Button>
			</Popconfirm>
		</div>
	)
}

export default DeleteArticle
