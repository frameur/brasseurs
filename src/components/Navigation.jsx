import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink to="/" className={(nav) => (nav.isActive ? 'nav-active' : '')}>
        <ul>
          <li>brasseurs</li>
        </ul>
      </NavLink>
      <NavLink
        to="/tableau"
        className={(nav) => (nav.isActive ? 'nav-active' : '')}
      >
        <ul>
          <li>tableau</li>
        </ul>
      </NavLink>
 
      <NavLink
        to="/histoire"
        className={(nav) => (nav.isActive ? 'nav-active' : '')}
      >
        <ul>
          <li>story</li>
        </ul>
      </NavLink>
    </div>
  )
}

export default Navigation
