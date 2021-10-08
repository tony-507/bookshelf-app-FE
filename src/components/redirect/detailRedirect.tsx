import React from 'react'
import { Redirect, useParams } from "react-router-dom"

export const BookDetailRedirect = () => {
	let id = useParams()

	return <Redirect to={`/books/${id}`} />
}