import { useContext, useRef } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";
import { PopupContext } from "../../../../../contexts/PopupContext";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext); 
  const { setPopup } = useContext(PopupContext);
  
  const avatarRef = useRef()

  function handleSubmit(event) {
    event.preventDefault();
  
    handleUpdateAvatar(avatarRef.current.value);
    setPopup(null);
  }

  return (
    <form onSubmit={handleSubmit} name='update-profile-picture-popup'
        className="popup__form"
        noValidate>
      <div className="popup__inputs">
          <input
            ref={avatarRef}
            className="popup__input update-profile-picture-popup__input_picture"
            type="url"
            placeholder="Link da foto"
            required
          />
          <span
            className="popup__input-error update-profile-picture-popup__input_picture_error"
          ></span>
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