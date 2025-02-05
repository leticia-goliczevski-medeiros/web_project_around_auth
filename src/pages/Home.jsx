export default function Home(handleOpenPopup, handleClosePopup, popup, newCardPopup, editAvatarPopup, editProfilePopup, cards, handleCardLike, handleCardDelete) {
  return (
    <>
      <Header />
      <Main
      onOpenPopup={handleOpenPopup}
      onClosePopup={handleClosePopup}
      popup={popup}
      newCardPopup={newCardPopup}
      editAvatarPopup={editAvatarPopup}
      editProfilePopup={editProfilePopup}
      cards={cards}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete} />
      <Footer />
    </>
  )
}
