// Import deps
import React, { useState,useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

// Import components
import { Error, Ok } from './components/common/messages'
import { Navbar } from './components/common/navbar'
import { checkLogin } from './components/api/index'
import { PublicPage } from './components/public'
import { UserIntro } from './components/user'
import { Bookshelf } from './components/admin'
import { BookDetail } from './components/bookDetail'

// React-intl setup
import { AppRoute, AppLanguage } from './const';
import { LocalizedRouter, LocalizedSwitch, appStrings, LocalizedRedirect } from './i18n';

// Stylesheet
import './style.css'

// Wrap the components for better maintenance
export const App = () => {

  // States for account and error handling
  const [error,setError] = useState<string>('')
  const [displayError,setDisplayError] = useState(false)
  const [ok,setOk] = useState<string>('')
  const [displayOk,setDisplayOk] = useState(false)
  const [auth,setAuth] = useState<string>('')
  const [username,setUsername] = useState<string>('')
  const [password,setPassword] = useState<string>('')

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

  return (
      <LocalizedRouter
        RouterComponent={Router}
        languages={AppLanguage}
        appStrings={appStrings}
      >
        <div className="page-view wrap">

          <Navbar accountCredentials={accountCredentials} />

           <Error display={displayError} message={error} />

          <Ok display={displayOk} message={ok} />

          <LocalizedSwitch>
            <Route exact path={AppRoute.LandBookshelf}>
              <Redirect to={LocalizedRedirect(`/public`)} />
            </Route>
            <Route exact path={AppRoute.Home}>
              { auth==="" ? <PublicPage auth={auth} /> : <Redirect to={LocalizedRedirect(`/${auth}`)} /> }
            </Route>
            <Route exact path={AppRoute.User}>
              { auth==="user" ? <UserIntro username={username} messageDisplay={messageDisplay} /> : <Redirect to={LocalizedRedirect(`/public`)} /> }
            </Route>
            <Route exact path={AppRoute.Admin}>
              { auth==="admin" ? <Bookshelf /> : <Redirect to={LocalizedRedirect(`/public`)} /> }
            </Route>
            <Route exact path={AppRoute.BookDetail}>
              <BookDetail auth={auth} username={username} />
            </Route>
            <Route path="*">
              <div>Oh</div>
            </Route>
          </LocalizedSwitch>

          <div className="page-view">
            <hr />
            <div className="footer">
              <FormattedMessage id="footer" defaultMessage="By Tony Chan" /> @ 2021.
            </div>
          </div>
        </div>
      </LocalizedRouter>
  )
}