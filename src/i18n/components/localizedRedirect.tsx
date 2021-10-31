import React from 'react'
import { useIntl } from 'react-intl'
import { Redirect } from 'react-router-dom'


export const LocalizedRedirect = ({ to }) => {
	// Add language string in path

	const { locale } = useIntl();

	return (locale==="en" ? <Redirect to={`/en${to}`} /> : <Redirect to={`/zh${to}`} />)
}