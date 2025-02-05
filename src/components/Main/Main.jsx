import '../../blocks/profile.css';
import editProfilePictureIcon from '../../images/edit-profile-picture-icon.png';
import editProfileIcon from '../../images/edit-button.png';
import addCardIcon from '../../images/plus-sign.png';
import Card from './components/Card/Card.jsx'
import Popup from './components/Popup/Popup.jsx'
import {  useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

export default function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);

  const {onOpenPopup, onClosePopup, newCardPopup, editAvatarPopup, editProfilePopup, cards, onCardLike, onCardDelete} = props

  return (
    <main className='content'>
      <section className="profile">
          <div className="profile__picture-container" onClick={() => onOpenPopup(editAvatarPopup)}>
            <img
              className="profile__picture"
              src={currentUser.avatar}
              alt="Foto de perfil do usuário."
            />
            <img
              className="profile__picture-overlay-edit-icon"
              src={editProfilePictureIcon}
              alt="Ícone de editar foto de perfil."
            />
          </div>
          <div className="profile__information">
            <div className="profile__name-and-icon">
              <h1 className="profile__name">{currentUser.name}</h1>
              <img
                className="profile__edit-icon"
                src={editProfileIcon}
                alt="Ícone de editar informações do perfil."
                onClick={() => onOpenPopup(editProfilePopup)}
              />
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" onClick={() => onOpenPopup(newCardPopup)}>
            <img
              className="profile__add-button-plus-sign"
              src={addCardIcon}
              alt="Ícone de adicionar postagem."
            />
          </button>
        </section>
      
      <section className="gallery">
        <ul className="gallery__cards">
          {cards.map(card=> (
            <Card card={card} key={card._id} onOpenPopup={onOpenPopup} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          ))}
        </ul>
      </section>

      {props.popup && (
        <Popup onClose={onClosePopup} title={props.popup.title}>
          {props.popup.children}
        </Popup>
      )}
    </main>
  )
}