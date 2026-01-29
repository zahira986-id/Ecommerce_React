import { useState } from 'react'
import './App.css'
import Tracking from './compenets/tracking'
import Order from './compenets/order'
import Checkout from './compenets/checkout'

function App() {
  return (
    <>
      <Tracking />
      <Order />
      <Checkout />
    </>
  )
}

export default App
