import Header from "../components/Header/Header";
import LoginForm from "../components/LoginForm/LoginForm";

export default function Login({handleLogin}) {
  return (
    <>
      <Header />
      <LoginForm handleLogin={handleLogin} />
    </>
  )
}