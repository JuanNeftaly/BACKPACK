import { NavLink } from 'react-router-dom';
import { FooterEnd } from './FooterEnd';

export const Footer = () => {
  return (
    <footer>
        <div className='footer__main'>
            <div className="footer__text">
                <h2 className='footer__title'>¿Qué esperas? !Únete!</h2>
                <NavLink to="/login" className="footer__cta">Empezar</NavLink>
            </div>            
       
            <img src="/images/bubble-1.png" alt="buble" className="bubble bubble-1" />
            <img src="/images/bubble-3.png" alt="buble" className="bubble bubble-2" />
            <img src="/images/bubble-3.png" alt="buble" className="bubble bubble-3" />
            <img src="/images/bubble-2.png" alt="buble" className="bubble bubble-4"/>
            <img src="/images/bubble-2.png" alt="buble" className="bubble bubble-5"/>
            <img src="/images/bubble-5.png" alt="buble" className="bubble bubble-6" />
            <img src="/images/bubble-5.png" alt="buble" className="bubble bubble-7" />
       
       
        </div>

        <figure className='images__section'>
                <img src="/images/laptop-poses-2.png" className='img woman' alt="footer__img" />
                <img src="/images/chat-group-2.png" className='img chat' alt="footer__img" />
                <img src="/images/men-mobile-2.png" className='img man' alt="footer__img" />
        </figure>

        <FooterEnd/>       


    </footer>
  )
}
