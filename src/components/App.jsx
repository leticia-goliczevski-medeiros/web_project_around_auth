import '../blocks/page.css'
import { useEffect, useState, useContext } from 'react';
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
import { register, authorize, checkToken } from '../utils/auth.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { UserEmailContext } from '../contexts/UserEmailContext.js';
import { PopupContext } from '../contexts/PopupContext.js';
import { IsLoggedInContext } from '../contexts/IsLoggedInContext.js';

function App() {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const { setUserEmail } = useContext(UserEmailContext);
  const { setPopup } = useContext(PopupContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const editProfilePopup = { title: "Editar perfil", children: <EditProfile /> };
  const editAvatarPopup = { title: "Editar avatar", children: <EditAvatar /> };

  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link)
    .then((addedCard) => {
      setCards([addedCard, ...cards])
    })
  }

  const newCardPopup = { title: "Novo card", children: <NewCard onAddPlaceSubmit={handleAddPlaceSubmit} /> };
 
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
      setCards((cards) => cards.filter((currentCard) => currentCard._id !== card._id));
    })
  }

  function handleRegisterUser({password, email}) {
    register({password, email})
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`)
      })
      .then(() => {
        let infoTooltip = {title: 'Parabéns! Você está registrado!', children: <InfoTooltip registerStataus={true} />, infoTooltip: true}

        setPopup(infoTooltip)
      })
      .catch((error) => {
        let infoTooltip = {title: 'Ops, algo deu errado! Por favor, tente novamente.', children: <InfoTooltip registerStataus={false} />, infoTooltip: true}

        setPopup(infoTooltip);

        if (error.status == 400) {
          console.log(`${error}. Um dos campos não foi preenchido corretamente.`)
          return
        }
      })
  }

  function handleLogin({password, email}) {
    authorize({ password, email })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data)=> {
      setIsLoggedIn(true);
      localStorage.setItem("UserIdentifier", data.token);

      checkToken(data.token)
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .then((userData) => {
          setUserEmail(userData.data.email);
        })
        .catch((error) => {
          if (error.status == 400) {
            console.log(`${error}. Token não fornecido ou fornecido em formato errado.`)
          }
          if (error.status == 401) {
            console.log(`${error}. O token fornecido é inválido.`)
          }
        })

      navigate("/");
    })
    .catch((error) => {
      if (error.status == 400) {
        console.log(`${error}. Um ou mais campos não foram fornecidos.`)
        return
      }
      if (error.status == 401) {
        console.log(`${error}. Não foi possível encontrar o usuário com esse email.`)
        return
      }
    }) 
  }

  function getData() {
    api
    .getCards()
    .then((cardsList) => {
      setCards(cardsList);
    })

    api.getUser()
    .then((userObject) => {
      setCurrentUser(userObject)
      setIsLoading(false);
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
          return Promise.reject(`Error: ${res.status}`);
        })
        .then((userData) => {
          setIsLoggedIn(true);
          setUserEmail(userData.data.email);
          navigate("/");
        })
        .catch((error) => {
          if (error.status == 400) {
            console.log(`${error}. Token não fornecido ou fornecido em formato errado.`)
          }
          if (error.status == 401) {
            console.log(`${error}. O token fornecido é inválido.`)
          }
          setIsLoading(false)
          navigate("/signin")
        })
        
    } else {
      setIsLoading(false)
      navigate("/signin");
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      getData();
    }
  }, [isLoggedIn]);


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
            <Login handleLogin={handleLogin} />
          } />
          <Route path="/signup" element={
            <Register handleRegisterUser={handleRegisterUser} />
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
