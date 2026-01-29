import { useState } from 'react'
import './App.css'
import { CartProvider } from './context/CartContext'
import Home from './compenets/home'
import Checkout from './compenets/checkout'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  // Simple routing based on hash
  useState(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home'
      setCurrentPage(hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'checkout':
        return <Checkout />
      default:
        return <Home />
    }
  }

  return (
    <CartProvider>
      {renderPage()}
    </CartProvider>
  )
}

export default App
