import '../../blocks/auth-form.css';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  return (
      <form name='register-form'
          className="form"
          noValidate>
        <h2 className='form__title'>Inscrever-se</h2>
        <div className="form__inputs">
          <input
            className="form__input register-form__input_email"
            type="email"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            required
          />
          <input
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