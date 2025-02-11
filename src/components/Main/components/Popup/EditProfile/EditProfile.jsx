import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";
import { PopupContext } from "../../../../../contexts/PopupContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext); 
  const { setPopup } = useContext(PopupContext);

  const [name, setName] = useState(currentUser.name); 
  const [description, setDescription] = useState(currentUser.about); 

  function handleNameChange(event) {
    setName(event.target.value); 
  };

  function handleDescriptionChange(event) {
    setDescription(event.target.value); 
  };

  function handleSubmit(event) {
    event.preventDefault(); 

    handleUpdateUser({ name, about: description }); 
    setPopup(null);
  };

  return (
    <form onSubmit={handleSubmit} name='edit-profile-popup'
        className="popup__form"
        noValidate>
      <div className="popup__inputs">
          <input
            value={name}
            onChange={handleNameChange}
            className="popup__input edit-profile-popup__input_name"
            type="text"
            placeholder="Nome"
            minLength="2"
            maxLength="40"
            required
          />
          <span
            className="popup__input-error edit-profile-popup__input_name_error"
          ></span>
          <input
            value={description}
            onChange={handleDescriptionChange}
            className="popup__input edit-profile-popup__input_about"
            type="text"
            placeholder="Sobre mim"
            minLength="2"
            maxLength="200"
            required
          />
          <span
            className="popup__input-error edit-profile-popup__input_about_error"
          ></span>
          <button
            className="popup__submit-button edit-profile-popup__submit-button"
            type="submit"
          >
            Salvar
          </button>
        </div>
    </form>
  
  )
}