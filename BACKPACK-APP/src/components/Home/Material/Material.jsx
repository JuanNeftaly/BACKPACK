import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Reporte } from '../Reporte/Reporte';
import { PDFDownloadLink } from '@react-pdf/renderer';


export const Material = ({ setBackReport, doc }) => {

  const { title, cicloPublicacion, annioPublicacion, url, materia } = doc;

  const [fav, setFav] = useState(false);
  const [countFav, setCountFav] = useState(0);


  const [like, setLike] = useState(false);
  const [countLike, setCountLike] = useState(0);

  return (
    <div className='material'>


      <div className="fav__content">

        <figure>
          <img src="/images/pdf.png" alt="pdf-image" />
        </figure>

        <div className="fav__info">
          <h2 className='fav-title'>{title}</h2>
          <p className='fav__description'>Año: {annioPublicacion}</p>
          <p className='fav__description'>Materia: {materia}</p>

          <div className="fav__info--dates">

            <p className='dates__cicle'>Ciclo {cicloPublicacion}</p>
          </div>

        </div>
      </div>

      <div className="fav__interaction">
        <div className="fav__section" >

          <div className="fav__section-heart" onClick={() => { setFav(!fav) }}>
            {
              fav ? (
                <figure>
                  <img src="/images/fav.svg" alt="heart-ico" />
                  <p className='count'>{countFav + 1}</p>
                </figure>
              ) : (
                <figure>
                  <img src="/images/heart.svg" alt="heart-ico" />
                  <p className='count'>{countFav}</p>
                </figure>
              )
            }
          </div>

          <div className="fav__section-like" onClick={() => { setLike(!like) }}>
            {
              like ? (
                <figure>
                  <img src="/images/addLike.png" className='like-ico' alt="like-ico" />
                  <p className='count'>{countLike + 1}</p>
                </figure>
              ) : (
                <figure>
                  <img src="/images/like.png" alt="like-ico" className='like-ico' />
                  <p className='count'>{countLike}</p>
                </figure>
              )
            }
          </div>

        </div>

        <div className="fav__options">

          <a href={url} className='ico-fav-container' to='/oneMateria' target='_blank'>
            <img src="/images/send-pdf.svg" alt="descarga" />
          </a>

          <button to='/reporte' className='ico-fav-container' onClick={() => { setBackReport(true) }}>
            <img src="/images/report.svg" alt="descarga" />
          </button>
        </div>
      </div>

    </div>
  )
}