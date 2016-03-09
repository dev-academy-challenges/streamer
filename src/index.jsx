import React from 'react'

// Let's just pull out the one function we need
import { render } from 'react-dom'

import App from './components/app.jsx'

const app = document.createElement('div')

document.body.appendChild(app)

render(<App/>, app)
