import React, { Dispatch, SetStateAction } from 'react'
import { Redirect, useRouteMatch } from "react-router-dom"

import PublicPage from './../public/index'
import UserPage from './../user/index'
import StaffPage from './../admin/index'
import BookDetail from './../bookDetail/index'

interface modeUI {
	username: string;
	auth: string;
	messageDisplay: {
	    setError: Dispatch<SetStateAction<string>>;
	    setDisplayError: Dispatch<SetStateAction<boolean>>;
	    setOk: Dispatch<SetStateAction<string>>;
	    setDisplayOk: Dispatch<SetStateAction<boolean>>;
  	}
}

export const ModeRedirect = (props: modeUI) => {
	const match = useRouteMatch()
	let mode = {}
	if (match)
		mode = match?.params
	const { username, auth, messageDisplay } = props

	if (mode !== null) {
		if (mode === "landing")
			return auth === '' ? <PublicPage /> : <Redirect to={"/"+auth} />
		else if (mode === "user")
			return auth === 'user' ? <UserPage username={username} messageDisplay={messageDisplay} /> : <Redirect to="/" />
		else if (mode === "admin")
			return auth === 'admin' ? <StaffPage /> : <Redirect to="/" />
		else if (mode === "books")
			return <BookDetail auth={auth} username={username} />
	}
	else
		return <Redirect to="/erros/404" />
}