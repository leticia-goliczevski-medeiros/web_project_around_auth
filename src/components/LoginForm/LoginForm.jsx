import '../../blocks/auth-form.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginForm({handleLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value); 
  };

  function handlePasswordChange(event) {
    setPassword(event.target.value); 
  };

  function handleSubmit(event) {
    event.preventDefault(); 

    if (!email || !password) {
      return;
    } 

    handleLogin({password, email})
  };

  return (
      <form name='login-form'
        onSubmit={handleSubmit}
          className="form"
          noValidate>
        <h2 className='form__title'>Entrar</h2>
        <div className="form__inputs">
          <input
            value={email}
            onChange={handleEmailChange}
            className="form__input login-form__input_email"
            type="email"
            placeholder="Email"
            minLength="2"
            required
          />
          <input
            value={password}
            onChange={handlePasswordChange}
            className="form__input login-form__input_password"
            type="password"
            placeholder="Senha"
            required
          />
      </div>
        <button
          className="form__submit-button login-form__submit-button"
          type="submit"
        >
          Entrar
        </button>
        <p className='form__text'>Ainda não é membro? <Link to="/signup" className='form__link' >Inscreva-se aqui!</Link> </p>
      </form> 
  )
}