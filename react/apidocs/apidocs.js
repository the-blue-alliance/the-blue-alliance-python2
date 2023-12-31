import React from 'react'
import ReactDOM from 'react-dom'
import ApiDocsFrame from './ApiDocsFrame'

import './apidocs.less'

const swaggerUrl = document.getElementById('swagger_url').innerHTML
ReactDOM.render(
  <ApiDocsFrame url={swaggerUrl} />,
  document.getElementById('content')
)
