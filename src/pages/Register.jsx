import Header from "../components/Header/Header";
import RegisterForm from "../components/RegisterForm/RegisterForm";

export default function Register({handleRegisterUser}) {
  return (
    <>
      <Header />
      <RegisterForm handleRegisterUser={handleRegisterUser}/>
    </>
  )
}