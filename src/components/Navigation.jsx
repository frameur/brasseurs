import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink to="/" className={(nav) => (nav.isActive ? 'nav-active' : '')}>
        <ul>
          <li>les brasseurs</li>
        </ul>
      </NavLink>
      <NavLink
        to="/about"
        className={(nav) => (nav.isActive ? 'nav-active' : '')}
      >
        <ul>
          <li>le brasseur</li>
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
