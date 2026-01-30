import React from 'react'
import '../styles/shared/general.css'
import '../styles/shared/header.css'
import './tracking.css'
// useCart: Hook personnalisé pour accéder aux données du panier
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

function Tracking() {
  // Récupération de la fonction pour obtenir le nombre total d'articles dans le panier
  const { getCartQuantity } = useCart()

  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <span className="logo-text">ID OMAR Zahira</span>
          </Link>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <Link to="/orders" className="orders-link header-link">
            <span className="orders-text">Orders</span>
          </Link>

          <Link to="/checkout" className="cart-link header-link">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            {/* Affiche dynamiquement le nombre d'articles dans le panier */}
            <div className="cart-quantity">{getCartQuantity()}</div>
            <div className="cart-text">Panier</div>
          </Link>
        </div>
      </div>

      <div className="tracking-page">
        <div className="order-tracking">
          <Link to="/orders" className="back-to-orders-link link-primary">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on Monday, June 13
          </div>

          <div className="product-info">
            Black and Gray Athletic Cotton Socks - 6 Pairs
          </div>

          <div className="product-info">
            Quantity: 1
          </div>

          <img className="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg" />

          <div className="progress-labels-container">
            <div className="progress-label">
              Preparing
            </div>
            <div className="progress-label current-status">
              Shipped
            </div>
            <div className="progress-label">
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tracking
