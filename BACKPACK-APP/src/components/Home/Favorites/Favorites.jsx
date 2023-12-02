import React from 'react'
import { NavBar } from '../NavBar/NavBar'
import { Material } from '../Material/Material'

export const Favorites = () => {
  return (
    <div className='material__div'>

        <div className="materia-name">
          <h2 className='name-title'>Favoritos</h2>
        </div>

        <Material/>
        <Material/>
        <Material/>
    </div>
  )
}
