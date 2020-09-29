import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
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
