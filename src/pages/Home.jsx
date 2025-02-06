import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';

export default function Home({onOpenPopup,
  onClosePopup, popup, newCardPopup, editAvatarPopup, editProfilePopup, cards, onCardLike, onCardDelete}) {
  
  return (
    <>
      <Header />
      <Main
      onOpenPopup={onOpenPopup}
      onClosePopup={onClosePopup}
      popup={popup}
      newCardPopup={newCardPopup}
      editAvatarPopup={editAvatarPopup}
      editProfilePopup={editProfilePopup}
      cards={cards}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete} />
      <Footer />
    </>
  )
}
