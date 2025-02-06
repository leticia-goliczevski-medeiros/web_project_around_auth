import '../../../../blocks/header.css';
import { Link } from 'react-router-dom';

export default function Instruction() {
  return (
    <Link to="/signin" className='header__instruction'>Entrar</Link>
  )
}