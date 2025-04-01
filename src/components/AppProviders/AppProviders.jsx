import { useState } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { IsLoggedInContext } from '../../contexts/IsLoggedInContext.js';
import { PopupContext } from '../../contexts/PopupContext.js';
import { UserEmailContext } from '../../contexts/UserEmailContext.js';
import { IsMenuOpenContext } from '../../contexts/IsMenuOpenContext.js';
import { TokenContext } from '../../contexts/TokenContext.js';

import { api } from '../../utils/api.js';

export default function AppProviders({children}) {
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState('');

  function handleUserUpdate(user) {
    api.updateProfileInfo(user).then((userObject)=> setCurrentUser(userObject))
  };

  function handleAvatarUpdate(avatarLink) {
    api.updateProfilePicture(avatarLink).then((userObject)=> setCurrentUser(userObject))
  };
  
  return (
    <TokenContext.Provider value={{token, setToken}}>
      <PopupContext.Provider value={{popup, setPopup}}>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, handleUserUpdate, handleAvatarUpdate }}>
          <UserEmailContext.Provider value={{userEmail, setUserEmail}}>
            <IsLoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
              <IsMenuOpenContext.Provider value={{isMenuOpen, setIsMenuOpen}}>
                {children}
              </IsMenuOpenContext.Provider>
            </IsLoggedInContext.Provider>
          </UserEmailContext.Provider>
        </CurrentUserContext.Provider>
      </PopupContext.Provider>
    </TokenContext.Provider>
  )
}