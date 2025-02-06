import '../../blocks/header.css'
import logo from '../../images/around.png';
import UserInfo from './components/UserInfo/UserInfo';
import Instruction from './components/Instruction/Instruction';


export default function Header() {
  const isLoggedIn = false;
  return (
    <header className='header'>
      <img
        className="header__logo"
        src={logo}
        alt="Logo escrito 'Around the U.S.'"
      />

      { isLoggedIn? < UserInfo /> : < Instruction /> }
    </header>
  )
}