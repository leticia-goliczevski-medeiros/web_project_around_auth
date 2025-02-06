import '../../../../../blocks/popup.css'

export default function LoginForm({onClosePopup}) {
  return (
    <form name='login-popup'
        className="popup__form"
        noValidate>
      <div className="popup__inputs">
        <input
          className="popup__input login-popup__input_email"
          type="email"
          placeholder="Email"
          minLength="2"
          maxLength="30"
          required
        />
        <span
          className="popup__input-error login-popup__input_email_error"
        ></span>
        <input
          className="popup__input login-popup__input_password"
          type="password"
          placeholder="Senha"
          required
        />
        <span
          className="popup__input-error login-popup__input_password_error"
        ></span>
    </div>
      <button
        className="popup__submit-button login-popup__submit-button"
        type="submit"
      >
        Entrar
      </button>
    </form>
  )
}