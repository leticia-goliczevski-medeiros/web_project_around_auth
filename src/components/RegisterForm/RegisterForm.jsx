import '../../blocks/auth-form.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { register } from '../../utils/auth.js';

export default function RegisterForm() {
  const navigate = useNavigate();

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

    register({password, email}
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${error.status}`)
      })
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        if (error.status == 400) {
          console.log(`${error}. Um dos campos não foi preenchido corretamente.`)
          return
        }
      })
    )
  }

  return (
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
            maxLength="30"
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
  )
}