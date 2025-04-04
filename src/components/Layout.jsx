import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Layout.css'
import { useAuth } from '../context/AuthContext'

import {
  FaInstagram,
  FaLinkedin,
  FaDiscord,
  FaGithub,
  FaEnvelope,
  FaGlobe,
  FaMoon,
  FaSun,
  FaBars,
  FaUserCircle
} from 'react-icons/fa'

const NavLink = ({ to, children }) => {
  return (
    <Link to={to} className='nav-link'>
      {children}
    </Link>
  )
}

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    document.body.classList.toggle('dark-mode', newDarkMode)
    document.body.classList.toggle('light-mode', !newDarkMode)
  }

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate('/auth');
    }
  }

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    setDarkMode(prefersDarkMode)
    document.body.classList.toggle('dark-mode', prefersDarkMode)
    document.body.classList.toggle('light-mode', !prefersDarkMode)
  }, [])

  const NavLinks = () => (
    <div className='nav-links desktop-only'>
      <NavLink to='/home'>Home</NavLink>
      {isAuthenticated && (
        <NavLink to='/profile'>Profile</NavLink>
      )}
    </div>
  )

  return (
    <nav className='navbar'>
      <div className='container'>
        <div className='navbar-content'>
          <div className='navbar-brand'>
            <Link to='/' onClick={closeDrawer}>
              <span className='brand-text'>Rankrr</span>
            </Link>
          </div>

          <div className='navbar-actions'>
            <NavLinks />

            <button
              className='icon-button'
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              onClick={toggleDarkMode}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {isAuthenticated && (
              <div className="user-info">
                <span className="user-greeting">Hi, {user?.name || 'User'}</span>
              </div>
            )}

            <button
              className='button primary-button'
              onClick={handleAuthAction}
            >
              {isAuthenticated ? 'Sign out' : 'Sign in'}
            </button>

            <button
              className='icon-button mobile-only hamburger'
              onClick={toggleDrawer}
              aria-label='Open menu'
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
        onClick={closeDrawer}
      ></div>
      <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className='drawer-header'>
          <h3>Menu</h3>
          <button className='close-button' onClick={closeDrawer}>
            ×
          </button>
        </div>
        <div className='drawer-body'>
          <NavLink to='/home' onClick={closeDrawer}>Home</NavLink>

          {isAuthenticated && (
            <NavLink to='/profile' onClick={closeDrawer}>Profile</NavLink>
          )}

          <button className='drawer-button' onClick={toggleDarkMode}>
            {darkMode ? (
              <>
                <FaSun className='button-icon' />
                Light Mode
              </>
            ) : (
              <>
                <FaMoon className='button-icon' />
                Dark Mode
              </>
            )}
          </button>

          <button className='drawer-button' onClick={() => {
            handleAuthAction();
            closeDrawer();
          }}>
            <FaUserCircle className='button-icon' />
            {isAuthenticated ? 'Sign out' : 'Sign in'}
          </button>
        </div>
      </div>
    </nav>
  )
}

const Footer = () => {
  const socialLinks = [
    { icon: FaInstagram, href: "TODO", label: 'Instagram' },
    { icon: FaLinkedin, href: "TODO", label: 'LinkedIn' },
    { icon: FaDiscord, href: "TODO", label: 'Discord' },
    { icon: FaGithub, href: "TODO", label: 'GitHub' },
    { icon: FaEnvelope, href: "TODO", label: 'Email' },
    { icon: FaGlobe, href: "TODO", label: 'Website' }
  ]

  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-content'>
          <div className='social-links'>
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className='social-link'
                target='_blank'
                rel='noopener noreferrer'
                aria-label={link.label}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>

          <p className='copyright'>
            © {new Date().getFullYear()} {' '}<b>Rankrr</b> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

const Layout = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className='layout'>
      <Navbar/>
      <main className='main-content'>
        <div className='container'>{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout