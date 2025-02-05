import '../blocks/page.css'
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import NewCard from './Main/components/Popup/NewCard/NewCard.jsx'
import EditProfile from './Main/components/Popup/EditProfile/EditProfile.jsx'
import EditAvatar from './Main/components/Popup/EditAvatar/EditAvatar.jsx'
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  
  const [popup, setPopup] = useState(null);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(()=> {
    api.getUser()
      .then((userObject) => {
        setCurrentUser(userObject)
      })
  }, [])

  function handleUpdateUser(user) {
    api.saveProfileInfo(user).then((userObject)=> setCurrentUser(userObject))
  };

  function handleUpdateAvatar(avatarLink) {
    api.updateProfilePicture(avatarLink).then((userObject)=> setCurrentUser(userObject))
  };

  const editProfilePopup = { title: "Edit profile", children: <EditProfile onClosePopup={handleClosePopup}/> };
  const editAvatarPopup = { title: "Edit avatar", children: <EditAvatar onClosePopup={handleClosePopup}/> };

  const [cards, setCards] = useState([])
 
  function handleCardLike(card) {
    if (card.isLiked) {
      api
      .removeCardLike(card._id)
      .then((updatedCard) => {
        setCards((cards) => {
          return cards.map((currentCard) => {
            return currentCard._id === card._id ? updatedCard : currentCard
          })
        })
      })
    } else {
      api
      .addCardLike(card._id)
      .then((updatedCard) => {
        setCards((cards) => {
          return cards.map((currentCard) => {
            return currentCard._id === card._id ? updatedCard : currentCard
          })
        })
      })
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
    })
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link)
    .then((addedCard) => {
      setCards([addedCard, ...cards])
    })
  }

  const newCardPopup = { title: "New card", children: <NewCard onAddPlaceSubmit={handleAddPlaceSubmit} onClosePopup={handleClosePopup}/> };

  useEffect(()=> {
      api
      .getInitialCards()
      .then((cardsList) => {
        setCards(cardsList);
      })
  }, [])
  
  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
      <div className="App">
        <div className="page">
          <Routes>
            <Route path="/" element={
              // <ProtectedRoute>
                <Home onOpenPopup={handleOpenPopup}
                onClosePopup={handleClosePopup}
                popup={popup}
                newCardPopup={newCardPopup}
                editAvatarPopup={editAvatarPopup}
                editProfilePopup={editProfilePopup}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} />
              // </ProtectedRoute>
            } />
        
            {/* <Route path="/signin" element={ <Login />} /> */}
            {/* <Route path="/signup" element={ <Register />} /> */}
            
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
