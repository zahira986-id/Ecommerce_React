

import React, { useState } from 'react'

// Link de react-router-dom remplace les balises <a> pour la navigation
// Avantage: Navigation sans rechargement de page (SPA - Single Page Application)
import { Link } from 'react-router-dom'

// useCart: Hook personnalisé pour accéder aux fonctions du panier
import { useCart } from '../context/CartContext'

// products: Tableau de tous les produits (importé depuis un fichier de données)
import { products } from '../data/products'

// Importation des fichiers CSS pour le style
import '../styles/shared/general.css'  // Styles généraux (boutons, liens, etc.)
import '../styles/shared/header.css'   // Styles du header
import './home.css'                    // Styles spécifiques à cette page

function Home() {
    // Récupération des fonctions du panier depuis le CartContext
    // addToCart: Fonction pour ajouter un produit au panier
    // getCartQuantity: Fonction pour obtenir le nombre total d'articles
    const { addToCart, getCartQuantity } = useCart()

    // État local pour stocker les quantités sélectionnées par produit
    // Exemple: { "id-produit-1": 3, "id-produit-2": 1 }
    const [quantities, setQuantities] = useState({})

    // État local pour gérer l'affichage du message "Ajouté" par produit
    const [addedProducts, setAddedProducts] = useState({})

    // État pour animer le compteur du panier dans le header
    const [cartBump, setCartBump] = useState(false)

    /**
     * Gère le changement de quantité dans le sélecteur
     * @param {string} productId - L'ID du produit
     * @param {string} value - La nouvelle quantité (sous forme de string)
     */
    const handleQuantityChange = (productId, value) => {
        setQuantities(prev => ({ ...prev, [productId]: parseInt(value) }))
    }

    /**
     * Gère l'ajout d'un produit au panier
     * @param {string} productId - L'ID du produit à ajouter
     */
    const handleAddToCart = (productId) => {
        // Récupère la quantité sélectionnée (par défaut: 1)
        const quantity = quantities[productId] || 1

        // Ajoute le produit au panier via le CartContext
        addToCart(productId, quantity)

        // Déclenche l'animation du compteur dans le header
        setCartBump(true)
        setTimeout(() => setCartBump(false), 300)

        // Affiche le message "Ajouté" pour ce produit
        setAddedProducts(prev => ({ ...prev, [productId]: true }))

        // Cache le message après 2 secondes
        setTimeout(() => {
            setAddedProducts(prev => ({ ...prev, [productId]: false }))
        }, 2000)
    }

    /**
     * Formate le prix de centimes vers dollars
     * @param {number} priceCents - Le prix en centimes (ex: 1090)
     * @returns {string} Le prix formaté (ex: "$10.90")
     */
    const formatPrice = (priceCents) => {
        return `$${(priceCents / 100).toFixed(2)}`
    }

    /**
     * Génère le chemin de l'image de notation
     * @param {number} stars - La note (ex: 4.5)
     * @returns {string} Le chemin de l'image (ex: "images/ratings/rating-45.png")
     */
    const getRatingImage = (stars) => {
        const rating = Math.round(stars * 10)
        return `images/ratings/rating-${rating}.png`
    }

    return (
        <>
            {/* ========== HEADER ========== */}
            <div className="header">
                {/* Section gauche: Logo */}
                <div className="left-section">
                    {/* Link remplace <a> pour une navigation sans rechargement */}
                    <Link to="/" className="header-link">
                        <span className="logo-text">ID OMAR Zahira</span>
                    </Link>
                </div>

                {/* Section centrale: Barre de recherche */}
                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Rechercher" />
                    <button className="search-button">
                        <img className="search-icon" src="images/icons/search-icon.png" alt="Rechercher" />
                    </button>
                </div>

                {/* Section droite: Liens Orders et Cart */}
                <div className="right-section">
                    {/* Lien vers la page des commandes */}
                    <Link className="orders-link header-link" to="/orders">
                        <span className="orders-text">Commandes</span>
                    </Link>

                    {/* Lien vers le panier avec le compteur dynamique */}
                    <Link className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" alt="Panier" />
                        {/* getCartQuantity() retourne le nombre total d'articles */}
                        <div className={`cart-quantity ${cartBump ? 'cart-quantity-bump' : ''}`}>
                            {getCartQuantity()}
                        </div>
                        <div className="cart-text">Panier</div>
                    </Link>
                </div>
            </div>

            {/* ========== CONTENU PRINCIPAL ========== */}
            <div className="home-page">
                {/* Grille de produits - utilise CSS Grid pour l'affichage */}
                <div className="products-grid">
                    {/* 
                      map() parcourt le tableau products et crée un élément pour chaque produit
                      key={product.id} est obligatoire pour React (identification unique)
                    */}
                    {products.map(product => (
                        <div key={product.id} className="product-container">
                            {/* Image du produit */}
                            <div className="product-image-container">
                                <img className="product-image" src={product.image} alt={product.name} />
                            </div>

                            {/* Nom du produit (limité à 2 lignes via CSS) */}
                            <div className="product-name limit-text-to-2-lines">
                                {product.name}
                            </div>

                            {/* Notation: étoiles + nombre d'avis */}
                            <div className="product-rating-container">
                                <img className="product-rating-stars" src={getRatingImage(product.rating.stars)} alt="Note" />
                                <div className="product-rating-count link-primary">
                                    {product.rating.count}
                                </div>
                            </div>

                            {/* Prix du produit */}
                            <div className="product-price">
                                {formatPrice(product.priceCents)}
                            </div>

                            {/* Sélecteur de quantité */}
                            <div className="product-quantity-container">
                                <select
                                    value={quantities[product.id] || 1}
                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                >
                                    {/* Crée les options 1 à 10 */}
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Espace flexible pour pousser le bouton vers le bas */}
                            <div className="product-spacer"></div>

                            {/* Message "Ajouté" - visible seulement après un clic */}
                            <div className={`added-to-cart ${addedProducts[product.id] ? 'visible' : ''}`}>
                                <img src="images/icons/checkmark.png" alt="Ajouté" />
                                Ajouté
                            </div>

                            {/* Bouton Ajouter au panier */}
                            <button
                                className="add-to-cart-button button-primary"
                                onClick={() => handleAddToCart(product.id)}
                            >
                                Ajouter au panier
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

// Exportation du composant pour l'utiliser dans App.jsx
export default Home
