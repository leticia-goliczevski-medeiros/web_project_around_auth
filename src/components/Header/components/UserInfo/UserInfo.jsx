import { useNavigate } from 'react-router-dom';
import '../../../../blocks/header.css'

export default function UserInfo() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("UserIdentifier");
    navigate("/login");
  }

  return (
    <div className="header__user-info">
      <p className='header__user-email'></p>
      <a onClick={logout} className='header__logout'>Sair</a>
    </div>
  )
}