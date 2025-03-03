import React from 'react'
import logo from './assets/react.svg'

function Header() {
  return (
    <header>
        <a href="#"><img src={logo} alt="logo" /></a>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header
