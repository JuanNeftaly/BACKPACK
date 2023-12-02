import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { Alert } from '../../Alert/Alert';
import { Error } from '../../Alert/Error';
import { registerRequest } from '../../../../services/register.service';
import { useForm } from 'react-hook-form';

export const Register = ({user, setUser}) => {

  const{register, handleSubmit} = useForm();
  
  const[alert, setAlert] = useState(false);
  const[error, setError] = useState(false);

  const navigate = useNavigate();


  const onSubmit = handleSubmit((values)=>{
        setAlert(true);

        setUser(values);
        registerRequest(user);

        setTimeout(() => {  
            navigate('/login')
        }, 2500);
  })


  return (
    <div className='login'>


        <div className="login__section">
            <figure className='section__images'>
                <img src="./../../public/images/puzzle.png" alt="book" className='book'/>
                <img src="./../../public/images/puzzle.png" alt="nut" className='gear'/>
                <img src="./../../public/images/puzzle.png" alt="nut" className='gear-2'/>
                <img src="./../../public/images/puzzle.png" alt="nut" className='gear-3'/>


                <img src="./../../public/images/bub-bk-1.png" alt="nut" className='bub-bk-1'/>
                <img src="./../../public/images/bub-bk-2.png" alt="nut" className='bub-bk-2'/>
                <img src="./../../public/images/bub-bk-3.png" alt="nut" className='bub-bk-3'/>
            </figure>
            
            <div className='div__form'>

                <form className='form-reg' onSubmit={onSubmit}>
                    <div className="form__logo-reg">
                        <img src="../../../public/images/logo-log.png" alt="logo" className='logo-reg'/>
                        <p className='logo__title-reg'>BACKPACK</p>
                    </div>

                    {
                        alert ? <Alert>Registrado con exito</Alert> : null
                    }
                    
                    {
                        error ? <Error>Todos los campos son obligatorios</Error> : null
                    }

                    <div className="campo-reg">
                        <label htmlFor="email" className='label'>Email :</label>

                        <input type="email" className='email input' 
                            {...register('email', {required: true})}
                        />
                        
                        <img src="../../../public/images/mail.svg" alt="mail" className='mail icon-form'/>
                    </div>

                    <div className="campo-reg">
                        <label htmlFor="name" className='label'>Nombre :</label>
                        
                        <input type="text" className='name input'
                            {...register('username', {required: true})}
                        />
                        
                        <img src="../../../public/images/user.svg" alt="mail" className='mail icon-form'/>
                    </div>

                    <div className="campo-reg">
                        <label htmlFor="carrera" className='label'>Carrera :</label>
                        
                        <select type="carrera" className='carrera input'
                            {...register('carrera', {required: true})}
                        >
                            <option value="">Seleccione</option>
                            <option value="informatica">Ingeniería en Informática</option>
                            <option value="civil">Ingeniería Civil</option>
                            <option value="mecanica">Ingeniería Mecánica</option>

                        </select>

                        
                        
                        <img src="../../../public/images/server.svg" alt="mail" className='mail icon-form'/>
                    </div>

                    <div className="campo-reg">
                        <label htmlFor="password" className='label'>Contraseña :</label>
                        
                        <input type="password" className='password input'
                            {...register('password', {required: true})}
                        />
                        
                        <img src="../../../public/images/lock.svg" alt="mail" className='mail icon-form'/>
                    </div>

                    <div className="campo__btn">

                        <button type='submit' className='send btn'>
                                <img src="../../../public/images/add.svg" alt="send"/>
                        </button>

                        <button className='new btn' type='reset'>
                            <img src="../../../public/images/trash.svg" alt="send"/>
                        </button>
                    </div>
                </form>

                <img src="./../../public/images/bub-bk-1.png" alt="nut" className='bub-fo-1'/>
                <img src="./../../public/images/bub-bk-3.png" alt="nut" className='bub-fo-2'/>
                <img src="./../../public/images/bub-bk-2.png" alt="nut" className='bub-fo-3'/>


                <img src="./../../public/images/bub-bk-1.png" alt="nut" className='bub-fo-4'/>
                <img src="./../../public/images/bub-bk-3.png" alt="nut" className='bub-fo-5'/>
                <img src="./../../public/images/bub-bk-2.png" alt="nut" className='bub-fo-6'/>
            </div>

        </div>



        <NavLink to='/login'>
            <button className='btn-back btn-back-reg'>
                <img src="../../../public/images/arrow.png" alt="arrow"/>
            </button>
        </NavLink>
      

        {/* BUBBLE BLUE */}
        <img src="../../../public/images/bub-reg-1.png" alt="bubble" className="bub-1 bub" />
        <img src="../../../public/images/bub-reg-2.png" alt="bubble" className="bub-2 bub" />
        <img src="../../../public/images/bub-reg-3.png" alt="bubble" className="bub-3 bub" />
        {/* BUBBLE PURPLE */}
        <img src="../../../public/images/bub-reg-4.png" alt="bubble" className="bub-4 bub" />
        <img src="../../../public/images/bub-reg-5.png" alt="bubble" className="bub-5 bub" />
        <img src="../../../public/images/bub-3-log.png" alt="bubble" className="bub-6 bub" />


    </div>
  )
}
