import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../blocks/header.css'
import { UserEmailContext } from '../../../../contexts/UserEmailContext';

export default function UserInfo() {
  const { userEmail, setUserEmail } = useContext(UserEmailContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("UserIdentifier");
    navigate("/signin");
  }

  return (
    <div className="header__user-info">
      <p className='header__user-email'>{userEmail}</p>
      <a onClick={logout} className='header__logout'>Sair</a>
    </div>
  )
}