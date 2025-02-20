import '../../blocks/auth-form.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";

import Popup from '../Main/components/Popup/Popup.jsx';

import { PopupContext } from '../../contexts/PopupContext.js';

export default function RegisterForm({handleRegisterUser}) {
  const { popup } = useContext(PopupContext);
  const { register, handleSubmit, formState: { errors } } = useForm({mode: "onChange"});

  function onSubmit(data) {
    const {password, email} = data;
    handleRegisterUser({password, email})
  }

  return (
    <>
      <form 
          onSubmit={handleSubmit(onSubmit)}
          name='register-form'
          className="form"
          noValidate>
        <h2 className='form__title'>Inscrever-se</h2>
        <div className="form__inputs">
          <input
            name="email"
            { ...register('email', {required: "Esse campo é obrigatório.", minLength: {
              value: 2,
              message: "O email precisa ter no mínimo 2 caracteres."
            }, maxLength: {
              value: 40,
              message: "O email precisa ter no máximo 40 caracteres."
            }, pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Formato de email inválido.'
            }}) }
            className="form__input register-form__input_email"
            type="email"
            placeholder="Email"
          />

          <ErrorMessage errors={errors} name="email" render={({ message }) => <p className='form__input-error form__input-error_email'>{message}</p>} />

          <input
            name="password"
            { ...register('password', {required: "Esse campo é obrigatório.", minLength: {
              value: 2,
              message: "A senha precisa ter no mínimo 2 caracteres."
            }, maxLength: {
              value: 40,
              message: "A senha precisa ter no máximo 40 caracteres."
            }}) } 
            className="form__input register-form__input_password"
            type="password"
            placeholder="Senha"
          />

          <ErrorMessage errors={errors} name="password" render={({ message }) => <p className='form__input-error form__input-error_password'>{message}</p>} />
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