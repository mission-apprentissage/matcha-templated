import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default () => {
  const history = useHistory()
  React.useEffect(() => {
    setTimeout(() => {
      history.push('/')
    }, 3000)
  })
  return (
    <div className='page not-found'>
      <div id='oopss'>
        <div id='error-text'>
          <span>404</span>
          <h1>PAGE INCONNUE</h1>
          <p className='hmpg'>
            <Link to='/' className='back'>
              Retour à l'accueil
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
