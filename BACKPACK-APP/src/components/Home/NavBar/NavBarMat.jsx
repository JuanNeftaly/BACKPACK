import { NavLink } from 'react-router-dom'

import { Panel } from '../Panel/Panel'
import { useRef, useState } from 'react';

export const NavBarMat = ({ setSearchMat, searchMat }) => {

    const [back, setBack] = useState(false);

    const navRef = useRef();

    const showNavBarHome = () => {
        navRef.current.classList.toggle('show');
    }


    return (
        <header>

            {
                back ? <Panel setBack={setBack} /> : null
            }

            <nav className='navHome'>

                <div className="nav-container" ref={navRef}>
                    <form className='form'>
                        <div >
                            <figure>
                                <img src="/images/icon-search.svg" alt="" />
                            </figure>
                        </div>
                        <input type="text" placeholder='Realiza una búsqueda...'
                            value={searchMat}
                            onChange={(e) => { setSearchMat(e.target.value) }}
                        />
                    </form>

                    <div className="nav__menu">
                        <NavLink className='btn' to='/home'>
                            <img src="/images/icon-home.svg" alt="" />
                        </NavLink>

                        <NavLink className='btn-sec btn' to='/favorites'>
                            <img src="/images/unnamed.svg" alt="" />
                        </NavLink>

                        <NavLink className='btn-sec btn' onClick={() => { setBack(true) }}>
                            <img src="/images/back.svg" alt="" />
                        </NavLink>
                    </div>

                    <button className="btn-menu-nav btn-close-menu" onClick={showNavBarHome}>
                        <img src="/images/menu.png" alt="menu" className="icon-menu" />
                    </button>

                </div>


                <img src='/images/pelota-morada-oscura.png' className='b-1 b' />
                <img src='/images/pelota-magenta.png' className='b-2 b' />
                <img src='/images/pelota-magenta-pequeña.png' className='b-3 b' />



                <img src="/images/pelota-azul-oscura.png" alt="nut" className='b-4 b' />
                <img src="/images/pelota-azul.png" alt="nut" className='b-5 b' />
                <img src="/images/pelota-celeste.png" alt="nut" className='b-6 b' />


                <div className="home__logo">
                    <figure>
                        <img src="/images/logo.png" alt="" />
                    </figure>
                </div>


                <button className="btn-menu-nav" onClick={showNavBarHome}>
                    <img src="/images/menu.png" alt="menu" className="icon-menu" />
                </button>



            </nav>
        </header>
    )
}