import '../../../../blocks/header.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Instruction() {
  const location = useLocation();
  let instruction = 'Entrar';

  if(location.pathname == '/signup') {
    instruction = 'Faça o login';
  }

  return (
    <Link to="/signin" className='header__instruction'>{instruction}</Link>
  )
}