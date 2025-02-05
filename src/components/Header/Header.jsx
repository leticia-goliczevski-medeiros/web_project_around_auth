import '../../blocks/header.css'
import logo from '../../images/around.png';

export default function Header() {
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