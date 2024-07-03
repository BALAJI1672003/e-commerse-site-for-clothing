import React from 'react'
import './Offers.css'
import exclusive_image from '../assets/exclusive_image.png'
export const Offers = () => {
  return (
    <div className="offers">
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offer for You</h1>
            <p>Only on The Best Sellers Products</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image}/>
        </div>
    </div>
  )
}
