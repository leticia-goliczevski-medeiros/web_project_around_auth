import '../../blocks/auth-form.css';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { register } from '../../utils/auth.js';
import Popup from '../Main/components/Popup/Popup.jsx';
import InfoTooltip from '../Main/components/Popup/InfoTooltip/InfoTooltip.jsx';
import { PopupContext } from '../../contexts/PopupContext.js';

export default function RegisterForm() {
  const { popup, setPopup } = useContext(PopupContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      return;
    } 

    register({password, email})
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${error.status}`)
      })
      .then(() => {
        let infoTooltip = {title: 'Parabéns! Você está registrado!', children: <InfoTooltip registerStataus={true} />, infoTooltip: true}

        setPopup(infoTooltip)
      })
      .catch((error) => {
        let infoTooltip = {title: 'Ops, algo deu errado! Por favor, tente novamente.', children: <InfoTooltip registerStataus={false} />, infoTooltip: true}

        setPopup(infoTooltip);

        if (error.status == 400) {
          console.log(`${error}. Um dos campos não foi preenchido corretamente.`)
          return
        }
      })
  }

  return (
    <>
      <form 
          onSubmit={handleSubmit}
          name='register-form'
          className="form"
          noValidate>
        <h2 className='form__title'>Inscrever-se</h2>
        <div className="form__inputs">
          <input
            value={email}
            onChange={handleEmailChange}
            className="form__input register-form__input_email"
            type="email"
            placeholder="Email"
            minLength="2"
            required
          />
          <input
            value={password}
            onChange={handlePasswordChange}
            className="form__input register-form__input_password"
            type="password"
            placeholder="Senha"
            required
          />
      </div>
        <button
          className="form__submit-button register-form__submit-button"
          type="submit"
        >
          Inscrever-se
        </button>
        <p className='form__text'>Já é um membro? <Link to="/signin" className='form__link' >Faça o login aqui!</Link> </p>
      </form> 

      {popup && (
        <Popup title={popup.title} >
          {popup.children}
        </Popup>
      )}
    </>      
  )
}