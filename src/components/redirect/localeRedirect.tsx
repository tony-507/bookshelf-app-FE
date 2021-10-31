import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useParams } from "react-router-dom"

import { ModeRedirect } from './modeRedirect'
import en_gb from './../../i18n/en_gb'
import zh_hk from './../../i18n/zh_hk'

interface localeUI {
  setLocale: Dispatch<SetStateAction<string>>;
  locale: string;
  setMessages: Dispatch<SetStateAction<any>>;
  username: string;
  auth: string;
  messageDisplay: {
    setError: Dispatch<SetStateAction<string>>;
    setDisplayError: Dispatch<SetStateAction<boolean>>;
    setOk: Dispatch<SetStateAction<string>>;
    setDisplayOk: Dispatch<SetStateAction<boolean>>;
  }
}

export const LocaleRedirect = (props: localeUI) => {
  const { setLocale, locale, setMessages, username, auth, messageDisplay } = props

  useEffect(() => {
    if (locale === "zh-hk") {
      setLocale("zh-hk")
      setMessages(zh_hk)
    }
    else {
    	setLocale("en-gb")
    	setMessages(en_gb)
    }
  })

  return ModeRedirect({username: username, auth: auth, messageDisplay: messageDisplay})
}