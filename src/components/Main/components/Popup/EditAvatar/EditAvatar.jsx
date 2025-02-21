import { useContext } from "react";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";

import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";
import { PopupContext } from "../../../../../contexts/PopupContext";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext); 
  const { setPopup } = useContext(PopupContext);
  
  const { register, handleSubmit, formState: { errors } } = useForm({mode: "onChange"});

  function onSubmit(data) {
    const { link } = data;
    handleUpdateAvatar(link);
    setPopup(null);
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} name='update-profile-picture-popup'
      className="popup__form"
      noValidate>
      <div className="popup__inputs">
        <input
          name="link"
          { ...register('link', {required: "Esse campo é obrigatório.", pattern: {
            value: /https?:\/\/(www\.)?.{1,}/,
            message: 'Link inválido.'
          }}) }
          className="popup__input update-profile-picture-popup__input_picture"
          type="url"
          placeholder="Link da foto"
        />
        <ErrorMessage errors={errors} name="link" render={({ message }) => <p className='popup__input-error popup__input-error_top'>{message}</p>} />
      </div>

      <button
        className="popup__submit-button update-profile-picture-popup__submit-button"
        type="submit"
      >
        Salvar
      </button>
    </form>
  )
}