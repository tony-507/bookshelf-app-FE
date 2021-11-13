import React from 'react'
import { Redirect } from 'react-router-dom'


export const LocalizedRedirect = (to: string) => {
	// Add language string in path

	const locale = window.location.pathname.substring(1,3);

	return ((locale==="en" || locale==="") ? `/en${to}` : `/zh${to}`)
}