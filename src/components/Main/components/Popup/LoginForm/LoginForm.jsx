import '../../../../../blocks/auth-form.css';
import { Link } from 'react-router-dom';

export default function LoginForm({onClosePopup}) {
  return (
    <>
      <form name='login-form'
          className="form"
          noValidate>
        <h2 className='form__title'>Entrar</h2>
        <div className="form__inputs">
          <input
            className="form__input login-form__input_email"
            type="email"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            required
          />
          <input
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
        <p className='form__text'>Ainda não é membro? <Link to="/register" className='form__link' >Inscreva-se aqui!</Link> </p>
      </form>
      
    </>
    
  )
}