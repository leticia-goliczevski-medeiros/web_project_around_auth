import '../../blocks/auth-form.css';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authorize } from '../../utils/auth.js';
import { IsLoggedInContext } from '../../contexts/IsLoggedInContext';

export default function LoginForm() {
  const { setIsLoggedIn } = useContext(IsLoggedInContext);
  const navigate = useNavigate();

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

    authorize({ password, email })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data)=> {
      setIsLoggedIn(true);
      localStorage.setItem("UserIdentifier", data.token);
      navigate("/");
    })
    .catch((error) => {
      if (error.status == 400) {
        console.log(`${error}. Um ou mais campos não foram fornecidos.`)
        return
      }
      if (error.status == 401) {
        console.log(`${error}. Não foi possível encontrar o usuário com esse email.`)
        return
      }
    }) 
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
            maxLength="30"
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