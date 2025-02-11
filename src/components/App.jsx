import '../blocks/page.css'
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';

import NewCard from './Main/components/Popup/NewCard/NewCard.jsx'
import EditProfile from './Main/components/Popup/EditProfile/EditProfile.jsx'
import EditAvatar from './Main/components/Popup/EditAvatar/EditAvatar.jsx'

import { api } from '../utils/api.js';
import { checkToken } from '../utils/auth.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { IsLoggedInContext } from '../contexts/IsLoggedInContext.js';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([])
  const [popup, setPopup] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading ] = useState(true);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }
  const editProfilePopup = { title: "Editar perfil", children: <EditProfile onClosePopup={handleClosePopup}/> };
  const editAvatarPopup = { title: "Editar avatar", children: <EditAvatar onClosePopup={handleClosePopup}/> };

  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link)
    .then((addedCard) => {
      setCards([addedCard, ...cards])
    })
  }

  const newCardPopup = { title: "Novo card", children: <NewCard onAddPlaceSubmit={handleAddPlaceSubmit} onClosePopup={handleClosePopup}/> };

  function handleUpdateUser(user) {
    api.saveProfileInfo(user).then((userObject)=> setCurrentUser(userObject))
  };

  function handleUpdateAvatar(avatarLink) {
    api.updateProfilePicture(avatarLink).then((userObject)=> setCurrentUser(userObject))
  };
 
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

  function getData() {
    api
    .getInitialCards()
    .then((cardsList) => {
      setCards(cardsList);
    })

    api.getUser()
    .then((userObject) => {
      setCurrentUser(userObject)
    })
  }

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('UserIdentifier');

    if (token) {
      checkToken(token)
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Error: ${error.status}`);
        })
        .then(() => {
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((error) => {
          if (error.status == 400) {
            console.log(`${error}. Token não fornecido ou fornecido em formato errado.`)
          }
          if (error.status == 401) {
            console.log(`${error}. O token fornecido é inválido.`)
          }
        })
    } else {
      navigate("/signin");
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      getData();
    }
  }, [isLoggedIn]);

  setInterval(() => {
    setIsLoading(false)
  }, 2000)

  if(isLoading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
      <IsLoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <div className="App">
          <div className="page">
            <Routes>
              <Route path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Navigate to="/signin" replace />
                  )
                }
              />

              <Route path="/" element={
                <ProtectedRoute>
                  <Home onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  newCardPopup={newCardPopup}
                  editAvatarPopup={editAvatarPopup}
                  editProfilePopup={editProfilePopup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              } />

              <Route path="/signin" element={ 
                <ProtectedRoute anonymous>
                  <Login />
                </ProtectedRoute>
              } />

              <Route path="/signup" element={ 
                <ProtectedRoute anonymous>
                  <Register />
                </ProtectedRoute>
              } />
        
            </Routes>
          </div>
        </div>
      </IsLoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
