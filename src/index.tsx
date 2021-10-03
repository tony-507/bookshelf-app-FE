// bookshelf-app/src/index.tsx

// Import deps
import React, { useState,useEffect } from 'react'
import { render } from 'react-dom'
import { FormattedMessage, IntlProvider } from 'react-intl'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Import components
import PublicPage from './components/public/index'
import UserPage from './components/user/index'
import StaffPage from './components/admin/index'
import BookDetail from './components/bookDetail/index'
import { Error, Ok } from './components/common/messages'
import { Navbar } from './components/common/navbar'
import {checkLogin} from './components/api/index'

// Default language for set up
import en_gb from './i18n/en_gb'

// Stylesheet
import './style.css'

// Wrap the components for better maintenance
const WrappedFirst = () => {

  // States for account and error handling
  const [error,setError] = useState('')
  const [displayError,setDisplayError] = useState(false)
  const [ok,setOk] = useState('')
  const [displayOk,setDisplayOk] = useState(false)
  const [auth,setAuth] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  useEffect(() => {
	  checkLogin({setAuth: setAuth,setUsername: setUsername, setPassword: setPassword})
	}, [])


  // JSONs to pass as props
  const accountCredentials = {
  	auth: auth,
  	setAuth: setAuth,
  	username: username,
  	setUsername: setUsername,
  	password: password,
  	setPassword: setPassword
  }

  const messageDisplay = {
  	setError: setError,
  	setDisplayError: setDisplayError,
  	setOk: setOk,
  	setDisplayOk: setDisplayOk
  }

  // react-intl
  const [locale, setLocale] = useState(navigator.language)
  const [messages,setMessages] = useState(en_gb)

  return (
  	<IntlProvider locale={locale} key={locale} defaultLocale="en-gb" messages={messages}>
  	<Router>
		  <div className="page-view wrap">

		  	<Navbar accountCredentials={accountCredentials} locale={locale} setLocale={setLocale} setMessages={setMessages} messageDisplay={messageDisplay} />

			  <Error display={displayError} message={error} />

				<Ok display={displayOk} message={ok} />

				 <Switch>
				 	<Route exact path="/">
				 		<Redirect to="/landing" />
				 	</Route>
		    	<Route exact path="/landing">
		    		{auth === '' ? <PublicPage /> : <Redirect to={"/"+auth} />}
		    	</Route>
		    	<Route path="/user">
		    		{auth === 'user' ? <UserPage username={username} /> : <Redirect to="/" />}
		    	</Route>
		    	<Route path="/admin">
		    		{auth === 'admin' ? <StaffPage /> : <Redirect to="/" />}
		    	</Route>
		    	<Route path="/errors/:id">
		    		<h1>Error 404 Not Found</h1>
		    	</Route>
		    	<Route path="/books/:id" children={<BookDetail auth={auth} />} />
		    	<Route>
		    		<Redirect to="/errors/404" />
		    	</Route>
		    </Switch>

		    <div className="page-view">
		      <hr />
		      <div className="footer">
		        <FormattedMessage id="footer" defaultMessage="By Tony Chan" /> @ 2021.
		      </div>
		    </div>
		  </div>
		</Router>
	  </IntlProvider>
  )
}

// Find div container
const rootElement = document.getElementById('root')

// Render Bookshelf component in the DOM
render(<WrappedFirst />, rootElement)