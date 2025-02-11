import '../../../../blocks/gallery.css';
import deleteIcon from '../../../../images/delete-icon.png'
import heartIcon from '../../../../images/heart-icon.png'
import heartIconAcive from '../../../../images/heart-icon-active.png'
import ImagePopup from '../Popup/ImagePopup/ImagePopup';
import { useContext } from 'react';
import { PopupContext } from '../../../../contexts/PopupContext';


export default function Card(props) {
  const { setPopup } = useContext(PopupContext);
  const {card} = props;
  const { name, link, isLiked } = props.card;
  const imageComponent = { children: 
    <ImagePopup card={props.card}/>}

  function handleLikeClick(card) {
    props.onCardLike(card)
  }

  function handleDeleteClick(card) {
    props.onCardDelete(card)
  }

  return (
    <li className="gallery__card" >
      <img className="gallery__card-image" src={link} 
        onClick={()=> setPopup(imageComponent)} alt={name} />
      <img
        onClick={()=> handleDeleteClick(card)}
        className="gallery__delete-icon"
        src={deleteIcon}
        alt="Ícone de excluir."
      />
      <div className="gallery__card-info">
        <h2 className="gallery__card-title">{name}</h2>
        <div className="gallery__like-info">
          <img
            onClick={()=> handleLikeClick(card)}
            className="gallery__heart-icon"
            src={isLiked? heartIconAcive: heartIcon}
            alt="Ícone de coração."
          /> 
        </div>
      </div>
    </li>
  )
}