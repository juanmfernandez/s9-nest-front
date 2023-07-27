import React, { useEffect, useRef, useState } from 'react'
import { calcularReputacion } from './calculaReputacion'
import { useDispatch, useSelector } from 'react-redux'
import { getBarrio } from '../../features/pruebaBarrioSlice/pruebaBarrioSlice'
import Stars from './Stars/Stars'
import { Link } from 'react-router-dom'
import CarruselProductsCard from './CarruselProductsCard/CarruselProductsCard'
// import RenderCarrusel from './RenderCarrusel'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CardMiniPerfil from './CardMiniPerfil/CardMiniPerfil'
import UserBannerStatistics from './UserBannerStatistics/UserBannerStatistics'
import ReusableCarrusel from './ReusableCarrusel/ReusableCarrusel'
import './PerfilUsuarioConsumeAgustinLorenzi.css'

const PerfilUsuario = ({ usuario, geoInfo }) => {
  const ubication = useSelector(state => state?.location)
  const barrio = useSelector(state => state?.barrio?.barrio)
  const productsYouLike = useSelector((state) => state?.productsDb?.likeProducts)
  const [calculaRep, setCalculaRep] = useState('')
  const dispatch = useDispatch()
  const lastUbication = useRef(null)
  const image = localStorage.getItem('userImage')

  const reputacionUSer = { intercambiosExitosos: 15, intercambiosFallidos: 2, totalPublicaciones: 32, valoracionesPositivas: 15, valoracionesNegativas: 2, devoluciones: 1 }

  const objeto = {
    _id: '64b9bb6d821dd7fe3cb11333',
    email: 'pescadorabioso1992@gmail.com',
    firstName: 'pescado',
    lastName: 'rabioso',
    contact: '2944123456',
    address: 'Argentina,rio negro,san carlos de bariloche, ',
    isActive: true,
    roles: [
      'user'
    ],
    products: [],
    incomingOffers: [],
    createdAt: '2023-07-20T22:55:41.634Z',
    updatedAt: '2023-07-20T22:55:41.634Z',
    __v: 0
  }

  const productsDestacados = []

  useEffect(() => {
    setCalculaRep(calcularReputacion(reputacionUSer))
  }, [])

  useEffect(() => {
    if (ubication && ubication !== lastUbication.current) {
      lastUbication.current = ubication
      dispatch(getBarrio(ubication))
    }
  }, [ubication, dispatch])

  return (
    <div className='container principalPerfil p-2 d-flex flex-column justify-content-center align-items-center overflow-hidden mt-3 gap-5' style={{ minWidth: '350px', height: 'auto' }}>

      <div className='card d-flex flex-column justify-content-center align-items-center align-content-center flex-nowrap gap-3' style={{ minWidth: '350px', width: '340px', maxWidth: '600px', height: 'auto', border: 'none' }}>
        <div className='borde-estrellas'>

          {/* head perfil */}
          {/* <CardMiniPerfil usuario={objeto} barrio={barrio} /> */}
          <div className='foto-usuario'>
            <span className='circulo'>     <img src='' alt='' />    </span>
            <p>{usuario?.firstName} {usuario?.lastName}</p>

          </div>

          <br />
          {/* <p>{geoInfo?.map((prod, i) => (<div key={i}>{prod.location}</div>))}</p> */}

          {/* Estrellas valoracion */}
          <Stars number={calculaRep} />

        </div>

        {/* Calificacion Usuario  */}
        {/* <UserBannerStatistics reputacion={reputacionUSer} /> */}

        {/* info perfil */}
        <section>
          <Link to='/perfil/crudUSer' className='fw-semibold pb-0 border-bottom border-danger' style={{ fontSize: '15.256px', color: 'var(--background-nav)', textDecoration: 'none', paddingBottom: '5px' }}>
            Ver mas datos de este usuario
          </Link>
        </section>
      </div>

    </div>
  )
}

export default PerfilUsuario
