import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function useCart() {
    return useContext(CartContext)
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    const addToCart = (productId, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === productId)
            if (existingItem) {
                return prevCart.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [...prevCart, { productId, quantity }]
        })
    }

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.productId !== productId))
    }

    const getCartQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0)
    }

    const value = {
        cart,
        addToCart,
        removeFromCart,
        getCartQuantity
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
