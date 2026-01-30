/**
 * App.jsx - Composant principal de l'application
 * 
 * Ce fichier configure le ROUTING (navigation entre pages) de l'application.
 * On utilise react-router-dom pour gérer les différentes routes/pages.
 */

// Importation des hooks et composants de React
import './App.css'

// Importation des composants de react-router-dom:
// - BrowserRouter: Le conteneur principal qui active le routing
// - Routes: Conteneur pour toutes les routes de l'application
// - Route: Définit une route individuelle (URL + composant à afficher)
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importation du CartProvider qui gère l'état global du panier
// Tous les composants enfants auront accès aux données du panier
import { CartProvider } from './context/CartContext'

// Importation de tous les composants/pages de l'application
import Home from './compenets/home'           // Page d'accueil avec les produits
import Checkout from './compenets/checkout'   // Page du panier/paiement
import Order from './compenets/order'         // Page des commandes
import Tracking from './compenets/tracking'   // Page de suivi de commande

/**
 * Composant App - Point d'entrée de l'application
 * 
 * Structure:
 * - CartProvider: Fournit l'état du panier à tous les composants
 *   - BrowserRouter: Active le système de routing
 *     - Routes: Contient toutes les routes disponibles
 *       - Route: Chaque route associe une URL à un composant
 */
function App() {
  return (
    // CartProvider enveloppe toute l'application pour partager l'état du panier
    <CartProvider>
      {/* BrowserRouter active le système de navigation par URL */}
      <BrowserRouter>
        {/* Routes contient toutes les routes de l'application */}
        <Routes>
          {/* 
            Route définit quelle page afficher selon l'URL:
            - path="/" : L'URL de la route (/ = page d'accueil)
            - element={<Home />} : Le composant à afficher pour cette URL
          */}

          {/* Page d'accueil - affiche tous les produits */}
          <Route path="/" element={<Home />} />

          {/* Page checkout - affiche le panier et le paiement */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Page orders - affiche l'historique des commandes */}
          <Route path="/orders" element={<Order />} />

          {/* Page tracking - affiche le suivi d'une commande */}
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

// Exportation du composant App pour qu'il soit utilisé dans main.jsx
export default App
