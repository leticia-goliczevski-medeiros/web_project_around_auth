import '../../../../blocks/gallery.css';
import deleteIcon from '../../../../images/delete-icon.png'
import heartIcon from '../../../../images/heart-icon.png'
import heartIconAcive from '../../../../images/heart-icon-active.png'
import ImagePopup from '../Popup/ImagePopup/ImagePopup';
import { useContext } from 'react';
import { PopupContext } from '../../../../contexts/PopupContext';
import { TokenContext } from '../../../../contexts/TokenContext';

export default function Card(props) {
  const { setPopup } = useContext(PopupContext);
  const {card} = props;
  const { name, link, isLiked } = props.card;
  const { token } = useContext(TokenContext);

  const imageComponent = { children: 
    <ImagePopup card={props.card}/>}

  function handleLikeClick(card, token) {
    props.onCardLike(card, token)
  }

  function handleDeleteClick(card, token) {
    props.onCardDelete(card, token)
  }

  return (
    <li className="gallery__card" >
      <img className="gallery__card-image" src={link} 
        onClick={()=> setPopup(imageComponent)} alt={name} />
      <img
        onClick={()=> handleDeleteClick(card, token)}
        className="gallery__delete-icon"
        src={deleteIcon}
        alt="Ícone de excluir."
      />
      <div className="gallery__card-info">
        <h2 className="gallery__card-title">{name}</h2>
        <div className="gallery__like-info">
          <img
            onClick={()=> handleLikeClick(card, token)}
            className="gallery__heart-icon"
            src={isLiked? heartIconAcive: heartIcon}
            alt="Ícone de coração."
          /> 
        </div>
      </div>
    </li>
  )
}