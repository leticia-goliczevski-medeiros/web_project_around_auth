import '../../blocks/header.css'
import logo from '../../images/around.png';
import UserInfo from './components/UserInfo/UserInfo';
import Instruction from './components/Instruction/Instruction';
import { IsLoggedInContext } from '../../contexts/IsLoggedInContext';
import { useContext } from 'react';

export default function Header() {
  const { isLoggedIn } = useContext(IsLoggedInContext);
  
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