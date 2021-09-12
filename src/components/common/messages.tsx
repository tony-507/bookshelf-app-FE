import React from 'react'
import './style.css'

interface messageUI {
  display: boolean;
  message: string;
}

export const Error = (props: messageUI) => (
	props.display
	  ? <div className="error message">
	    {props.message}
	  </div>
	  : null
)

export const Ok = (props: messageUI) => (
  props.display
    ? <div className="ok message">
      {props.message}
    </div>
    : null
)