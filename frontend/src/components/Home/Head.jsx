import React from 'react'
import {Link} from 'react-router-dom'
const Head = () => {
  return (
    <div>
        <div className="header">
         <h2>SkyConnect</h2>
        <div className='header-nav'>
          <Link to="/about">
           About
          </Link>
          <Link to="/about">
           Services
          </Link>
        </div>
        <div className='btn'>
            <button className='sign'>Sign IN</button>
            <button className="sign">Sign Up</button>
        </div>
       </div>
    </div>
  )
}

export default Head
