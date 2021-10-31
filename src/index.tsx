// bookshelf-app/src/index.tsx

// Import deps
import React from 'react'
import { render } from 'react-dom'

// Import components
import { App } from './app'

// Find div container
const rootElement = document.getElementById('root')

// Render Bookshelf component in the DOM
render(<App />, rootElement)