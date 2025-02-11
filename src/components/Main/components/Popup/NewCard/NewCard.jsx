import { useState, useContext } from "react";
import { PopupContext } from "../../../../../contexts/PopupContext";

export default function NewCard({onAddPlaceSubmit}) {
  const { setPopup } = useContext(PopupContext);

  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  function handleNameChange(event) {
    setName(event.target.value)
  }
  function handleLinkChange(event) {
    setLink(event.target.value)
  }

  function handleAddPlaceSubmit(event){
    event.preventDefault();

    onAddPlaceSubmit(name, link);
    setPopup(null)
  }

  return (
    <form onSubmit={handleAddPlaceSubmit} name='add-card-popup'
        className="popup__form"
        noValidate>
      <div className="popup__inputs">
        <input
        onChange={handleNameChange} value={name}
          className="popup__input add-card-popup__input_title"
          type="text"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          required
        />
        <span
          className="popup__input-error add-card-popup__input_title_error"
        ></span>
        <input
        onChange={handleLinkChange} value={link}
          className="popup__input add-card-popup__input_link"
          type="url"
          placeholder="Link de imagem"
          required
        />
        <span
          className="popup__input-error add-card-popup__input_link_error"
        ></span>
    </div>
      <button
        className="popup__submit-button add-card-popup__submit-button"
        type="submit"
      >
        Criar
      </button>
    </form>
  
  )
}