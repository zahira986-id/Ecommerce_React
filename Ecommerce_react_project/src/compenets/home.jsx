import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import '../styles/shared/general.css'
import '../styles/shared/header.css'
import './home.css'

function Home() {
    const { addToCart, getCartQuantity } = useCart()
    const [quantities, setQuantities] = useState({})
    const [addedProducts, setAddedProducts] = useState({})

    const handleQuantityChange = (productId, value) => {
        setQuantities(prev => ({ ...prev, [productId]: parseInt(value) }))
    }

    const handleAddToCart = (productId) => {
        const quantity = quantities[productId] || 1
        addToCart(productId, quantity)

        // Show "Added" message
        setAddedProducts(prev => ({ ...prev, [productId]: true }))

        // Hide after 2 seconds
        setTimeout(() => {
            setAddedProducts(prev => ({ ...prev, [productId]: false }))
        }, 2000)
    }

    const formatPrice = (priceCents) => {
        return `$${(priceCents / 100).toFixed(2)}`
    }

    const getRatingImage = (stars) => {
        const rating = Math.round(stars * 10)
        return `images/ratings/rating-${rating}.png`
    }

    return (
        <>
            <div className="header">
                <div className="left-section">
                    <a href="/" className="header-link">
                        <img className="logo" src="images/logo-white.png" alt="Logo" />
                        <img className="mobile-logo" src="images/mobile-logo-white.png" alt="Logo" />
                    </a>
                </div>

                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search" />
                    <button className="search-button">
                        <img className="search-icon" src="images/icons/search-icon.png" alt="Search" />
                    </button>
                </div>

                <div className="right-section">
                    <a className="orders-link header-link" href="/orders">
                        <span className="orders-text">Orders</span>
                    </a>

                    <a className="cart-link header-link" href="#checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" alt="Cart" />
                        <div className="cart-quantity">{getCartQuantity()}</div>
                        <div className="cart-text">Cart</div>
                    </a>
                </div>
            </div>

            <div className="home-page">
                <div className="products-grid">
                    {products.map(product => (
                        <div key={product.id} className="product-container">
                            <div className="product-image-container">
                                <img className="product-image" src={product.image} alt={product.name} />
                            </div>

                            <div className="product-name limit-text-to-2-lines">
                                {product.name}
                            </div>

                            <div className="product-rating-container">
                                <img className="product-rating-stars" src={getRatingImage(product.rating.stars)} alt="Rating" />
                                <div className="product-rating-count link-primary">
                                    {product.rating.count}
                                </div>
                            </div>

                            <div className="product-price">
                                {formatPrice(product.priceCents)}
                            </div>

                            <div className="product-quantity-container">
                                <select
                                    value={quantities[product.id] || 1}
                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="product-spacer"></div>

                            <div className={`added-to-cart ${addedProducts[product.id] ? 'visible' : ''}`}>
                                <img src="images/icons/checkmark.png" alt="Added" />
                                Added
                            </div>

                            <button
                                className="add-to-cart-button button-primary"
                                onClick={() => handleAddToCart(product.id)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
