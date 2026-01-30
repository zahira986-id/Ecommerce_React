import React from 'react'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import '../styles/shared/general.css'
import './checkout.css'
import { Link } from 'react-router-dom'

function Checkout() {
    const { cart, getCartQuantity, removeFromCart } = useCart()

    const getProduct = (productId) => {
        return products.find(p => p.id === productId)
    }

    const formatPrice = (priceCents) => {
        return `$${(priceCents / 100).toFixed(2)}`
    }

    const calculateItemTotal = () => {
        return cart.reduce((total, item) => {
            const product = getProduct(item.productId)
            return total + (product ? product.priceCents * item.quantity : 0)
        }, 0)
    }

    const itemTotal = calculateItemTotal()
    const shipping = cart.length > 0 ? 499 : 0
    const beforeTax = itemTotal + shipping
    const tax = Math.round(beforeTax * 0.1)
    const orderTotal = beforeTax + tax

    if (cart.length === 0) {
        return (
            <>
                <div className="checkout-header">
                    <div className="header-content">
                        <div className="checkout-header-left-section">
                            <a href="/">
                                <img className="logo" src="images/logo.png" alt="Logo" />
                                <img className="mobile-logo" src="images/mobile-logo.png" alt="Logo" />
                            </a>
                        </div>

                        <div className="checkout-header-middle-section">
                            Checkout (0 items)
                        </div>

                        <div className="checkout-header-right-section">
                            <img src="images/icons/checkout-lock-icon.png" alt="Secure" />
                        </div>
                    </div>
                </div>

                <div className="checkout-page">
                    <div className="page-title">Your cart is empty</div>
                    <p>Add some products to your cart to see them here.</p>
                    <a href="/" className="link-primary">Continue shopping</a>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" alt="Logo" />
                            <img className="mobile-logo" src="images/mobile-logo.png" alt="Logo" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link" href="/">{getCartQuantity()} items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" alt="Secure" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {cart.map(item => {
                            const product = getProduct(item.productId)
                            if (!product) return null

                            return (
                                <div key={item.productId} className="cart-item-container">
                                    <div className="delivery-date">
                                        Delivery date: Tuesday, June 21
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image" src={product.image} alt={product.name} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {product.name}
                                            </div>
                                            <div className="product-price">
                                                {formatPrice(product.priceCents)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">{item.quantity}</span>
                                                </span>
                                                <span
                                                    className="delete-quantity-link link-primary"
                                                    onClick={() => removeFromCart(item.productId)}
                                                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                                                >
                                                    Delete
                                                </span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a delivery option:
                                            </div>
                                            <div className="delivery-option">
                                                <input type="radio" defaultChecked className="delivery-option-input" name={`delivery-${item.productId}`} />
                                                <div>
                                                    <div className="delivery-option-date">
                                                        Tuesday, June 21
                                                    </div>
                                                    <div className="delivery-option-price">
                                                        FREE Shipping
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="delivery-option">
                                                <input type="radio" className="delivery-option-input" name={`delivery-${item.productId}`} />
                                                <div>
                                                    <div className="delivery-option-date">
                                                        Wednesday, June 15
                                                    </div>
                                                    <div className="delivery-option-price">
                                                        $4.99 - Shipping
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        <div className="payment-summary-row">
                            <div>Items ({getCartQuantity()}):</div>
                            <div className="payment-summary-money">{formatPrice(itemTotal)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">{formatPrice(shipping)}</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">{formatPrice(beforeTax)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">{formatPrice(tax)}</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">{formatPrice(orderTotal)}</div>
                        </div>

                        <button className="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout
