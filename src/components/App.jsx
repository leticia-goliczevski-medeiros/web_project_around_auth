import '../blocks/page.css'
import { useEffect, useState, useContext, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Loading from '../pages/Loading.jsx';

import NewCard from './Main/components/Popup/NewCard/NewCard.jsx'
import EditProfile from './Main/components/Popup/EditProfile/EditProfile.jsx'
import EditAvatar from './Main/components/Popup/EditAvatar/EditAvatar.jsx'
import InfoTooltip from './Main/components/Popup/InfoTooltip/InfoTooltip.jsx';

import { api } from '../utils/api.js';
import { register, login } from '../utils/auth.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { UserEmailContext } from '../contexts/UserEmailContext.js';
import { PopupContext } from '../contexts/PopupContext.js';
import { IsLoggedInContext } from '../contexts/IsLoggedInContext.js';
import { TokenContext } from '../contexts/TokenContext.js';

function App() {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const { setUserEmail } = useContext(UserEmailContext);
  const { setPopup } = useContext(PopupContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, setToken } = useContext(TokenContext);

  const editProfilePopup = { title: "Editar perfil", children: <EditProfile /> };
  const editAvatarPopup = { title: "Editar avatar", children: <EditAvatar /> };

  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link, token)
    .then((addedCard) => {
      setCards([addedCard, ...cards]);
    })
    .catch((error) => console.log(error));
  }

  const newCardPopup = { title: "Novo card", children: <NewCard onAddPlaceSubmit={handleAddPlaceSubmit} /> };
 
  function handleCardLike(card, token) {
    if (card.isLiked) {
      api
      .removeCardLike(card._id, token)
      .then((updatedCard) => {
        setCards((cards) => {
          return cards.map((currentCard) => {
            return currentCard._id === card._id ? updatedCard : currentCard
          })
        })
      })
      .catch((error) => console.log(error))
    } else {
      api
      .addCardLike(card._id, token)
      .then((updatedCard) => {
        setCards((cards) => {
          return cards.map((currentCard) => {
            return currentCard._id === card._id ? updatedCard : currentCard
          })
        })
      })
      .catch((error) => console.log(error));
    }
  }

  function handleCardDelete(card, token) {
    api.deleteCard(card._id, token)
    .then(() => {
      setCards((cards) => cards.filter((currentCard) => currentCard._id !== card._id));
    })
    .catch((error) => console.log(error));
  }

  function handleUserRegister({password, email}) {
    register({password, email})
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((errorData) => {
          return Promise.reject(errorData.message || `Erro na requisição. ${res.status}`);
        });
      })
      .then(() => {
        let infoTooltip = {title: 'Parabéns! Você está registrado!', children: <InfoTooltip registerStataus={true} />, infoTooltip: true}

        setPopup(infoTooltip)
      })
      .catch((error) => {
        console.log(error);
        let infoTooltip = {title: 'Ops, algo deu errado! Por favor, tente novamente.', children: <InfoTooltip registerStataus={false} />, infoTooltip: true}

        setPopup(infoTooltip);
      })
  }

  function handleLogin({password, email}) {
    login({ password, email })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      
      return res.json().then((errorData) => {
        return Promise.reject(errorData.message || `Erro na requisição. ${res.status}`);
      });
    })
    .then((data)=> {
      setIsLoggedIn(true);
      localStorage.setItem("UserIdentifier", data.token);
      setToken(data.token);

      api.getUser(token)
        .then((userObject) => {
          setUserEmail(userObject.email);
        })
        .catch((error) => console.log(error));

      navigate("/");
    })
    .catch((error) => console.log(error)); 
  }

  const getData = useCallback(() => {
    api
    .getCards(token)
    .then((cardsList) => {
      setCards(cardsList);
    })
    .catch((error) => console.log(error));

    api.getUser(token)
    .then((userObject) => {
      setCurrentUser(userObject)
      setIsLoading(false);
    })
    .catch((error) => console.log(error));
  }, [setCurrentUser, token])

  const navigate = useNavigate();

  useEffect(() => {
    api.getUser(token)
      .then((userObject) => {
        setIsLoggedIn(true);
        setUserEmail(userObject.email);
        navigate("/");
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        navigate("/signin")
      })
  }, [setIsLoggedIn, setUserEmail, navigate, token])

  useEffect(() => {
    if (isLoggedIn) {
      getData();
    }
  }, [isLoggedIn, getData]);


  if(isLoading) {
    return (
      <Loading />
    )
  }

  return (
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
              <Home
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
            <Login onLoginHandle={handleLogin} />
          } />
          <Route path="/signup" element={
            <Register onUserRegister={handleUserRegister} />
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
